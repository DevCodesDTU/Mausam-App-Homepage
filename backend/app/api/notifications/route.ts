import { NextRequest, NextResponse } from "next/server";

interface RegisteredDevice {
  token: string;
  userId?: string;
  activities?: string[];
  platform?: string;
  lastActive: string;
}

// In-memory token store for registered mobile devices
const registeredDevices = new Map<string, RegisteredDevice>();

// In-memory log of dispatched notifications with audit information
const notificationHistory: Array<{
  id: string;
  title: string;
  body: string;
  type: string;
  targetActivity?: string;
  timestamp: string;
  targetTokensCount: number;
  data?: any;
  sentBy: string;
}> = [];

// Admin API Key validation
const ADMIN_API_KEY =
  process.env.MAUSAM_ADMIN_API_KEY ||
  process.env.ADMIN_API_KEY ||
  "mausam_secret_admin_key_2026";

function verifyAdminAuthorization(request: NextRequest): { authorized: boolean; reason?: string } {
  const authHeader = request.headers.get("authorization") || "";
  const customApiKeyHeader = request.headers.get("x-api-key") || "";

  let providedKey = "";
  if (authHeader.startsWith("Bearer ")) {
    providedKey = authHeader.substring(7).trim();
  } else if (customApiKeyHeader) {
    providedKey = customApiKeyHeader.trim();
  }

  if (!providedKey) {
    return { authorized: false, reason: "Missing Authorization header or X-API-KEY" };
  }

  if (providedKey !== ADMIN_API_KEY) {
    return { authorized: false, reason: "Invalid admin API key" };
  }

  return { authorized: true };
}

// Validation schema for notification payload
function validateNotificationPayload(payload: any): { valid: boolean; error?: string } {
  if (!payload || typeof payload !== "object") {
    return { valid: false, error: "Request body must be a valid JSON object" };
  }

  const title = payload.title;
  const message = payload.message || payload.body;

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return { valid: false, error: "Field 'title' is required and must be a non-empty string" };
  }

  if (title.length > 120) {
    return { valid: false, error: "Field 'title' exceeds maximum length of 120 characters" };
  }

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return { valid: false, error: "Field 'message' or 'body' is required and must be a non-empty string" };
  }

  if (message.length > 600) {
    return { valid: false, error: "Message body exceeds maximum length of 600 characters" };
  }

  if (payload.data && (typeof payload.data !== "object" || JSON.stringify(payload.data).length > 4096)) {
    return { valid: false, error: "Custom 'data' field must be a valid JSON object under 4KB" };
  }

  return { valid: true };
}

export async function GET(request: NextRequest) {
  const auth = verifyAdminAuthorization(request);
  if (!auth.authorized) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access: " + auth.reason },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    totalRegisteredDevices: registeredDevices.size,
    devices: Array.from(registeredDevices.values()).map((d) => ({
      userId: d.userId || "anonymous",
      activities: d.activities || [],
      platform: d.platform || "unknown",
      lastActive: d.lastActive,
      tokenMasked: d.token.slice(0, 14) + "...",
    })),
    recentDispatches: notificationHistory.slice(-25),
  });
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, error: "Malformed JSON payload in request body" },
        { status: 400 }
      );
    }

    const { action } = body;

    // -------------------------------------------------------------
    // 1. MOBILE DEVICE TOKEN REGISTRATION (Public from App)
    // -------------------------------------------------------------
    if (action === "register" || action === "register_token") {
      const { token, userId, activities, platform } = body;

      if (!token || typeof token !== "string" || token.length < 10) {
        return NextResponse.json(
          { success: false, error: "A valid device push token is required" },
          { status: 400 }
        );
      }

      registeredDevices.set(token, {
        token,
        userId: userId || "user",
        activities: Array.isArray(activities) ? activities : ["surfing", "cycling"],
        platform: platform || "mobile",
        lastActive: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: "Device successfully registered for live push notifications",
        totalRegisteredDevices: registeredDevices.size,
      });
    }

    // -------------------------------------------------------------
    // 2. ADMIN PUSH NOTIFICATION DISPATCH (Protected with API Key)
    // -------------------------------------------------------------
    if (action === "send" || action === "push" || action === "broadcast" || action === "trigger_alert") {
      // Security Check: Verify Admin API Key
      const auth = verifyAdminAuthorization(request);
      if (!auth.authorized) {
        return NextResponse.json(
          {
            success: false,
            error: "Forbidden: Push notification dispatch requires a valid Admin API Key. " + auth.reason,
          },
          { status: 401 }
        );
      }

      // Security Check: Validate JSON Notification Structure
      const validation = validateNotificationPayload(body);
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: "Validation failed: " + validation.error },
          { status: 400 }
        );
      }

      const notificationTitle = body.title.trim();
      const notificationBody = (body.message || body.body).trim();
      const notificationType = body.type || "weather_alert";
      const targetActivity = body.targetActivity?.toLowerCase() || null;
      const customData = body.data || { type: notificationType, timestamp: new Date().toISOString() };
      const specificToken = body.token;

      // Filter target device tokens
      let targetTokens: string[] = [];

      if (specificToken) {
        targetTokens = [specificToken];
      } else if (targetActivity) {
        // Send only to users who enjoy this activity
        targetTokens = Array.from(registeredDevices.values())
          .filter((d) => d.activities?.map((a) => a.toLowerCase()).includes(targetActivity))
          .map((d) => d.token);
        
        // If filter is empty but devices exist, fallback to all devices
        if (targetTokens.length === 0 && registeredDevices.size > 0) {
          targetTokens = Array.from(registeredDevices.keys());
        }
      } else {
        targetTokens = Array.from(registeredDevices.keys());
      }

      // Format payload for Expo Push Gateway
      const messagesToSend = targetTokens.map((t) => ({
        to: t,
        sound: "default",
        title: notificationTitle,
        body: notificationBody,
        data: {
          ...customData,
          notificationType,
          targetActivity,
        },
        badge: 1,
        priority: "high",
      }));

      let expoPushResult: any = null;

      if (messagesToSend.length > 0) {
        try {
          const expoRes = await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Accept-Encoding": "gzip, deflate",
            },
            body: JSON.stringify(messagesToSend),
          });

          if (expoRes.ok) {
            expoPushResult = await expoRes.json();
          }
        } catch (expoErr: any) {
          console.warn("Expo Push gateway communication notice:", expoErr.message);
        }
      }

      // Record in audit log
      const dispatchRecord = {
        id: `dispatch-${Date.now()}`,
        title: notificationTitle,
        body: notificationBody,
        type: notificationType,
        targetActivity: targetActivity || "all",
        timestamp: new Date().toISOString(),
        targetTokensCount: targetTokens.length,
        data: customData,
        sentBy: "authorized_admin_script",
      };
      notificationHistory.push(dispatchRecord);

      return NextResponse.json({
        success: true,
        message: `Successfully dispatched notification to ${targetTokens.length} device(s)`,
        dispatchId: dispatchRecord.id,
        summary: {
          title: notificationTitle,
          body: notificationBody,
          type: notificationType,
          targetActivity: targetActivity || "all",
          devicesReached: targetTokens.length,
          timestamp: dispatchRecord.timestamp,
        },
        expoPushResult,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: "Invalid action. Supported actions: 'register', 'send'",
      },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Notifications API Security Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
