import { Platform } from "react-native";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { registerPushToken, sendPushAlert } from "../api/client";
import notificationRulesData from "../../constants/notification-rules.json";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  severity?: "emergency" | "warning" | "optimal" | "info";
  type?: "weather_alert" | "activity_window" | "uv_safety" | "general" | "emergency_broadcast";
  data?: any;
}

interface WeatherTelemetry {
  temp: number;
  precipitation: number;
  windSpeed: number;
  humidity?: number;
  uvIndex?: number;
}

// 1. Intelligent Expo Go detection
// In latest Expo Go (SDK 52+), expo-notifications native module is removed / unsupported
export const isExpoGo =
  Constants?.executionEnvironment === ExecutionEnvironment.StoreClient ||
  (Constants as any)?.appOwnership === "expo";

// 2. Safe lazy loader for expo-notifications
// NEVER imports or requires expo-notifications inside Expo Go, completely eliminating the crash/warning!
let cachedNotifications: any = null;

function getNotificationsModule(): any | null {
  if (isExpoGo) {
    return null;
  }
  if (cachedNotifications) {
    return cachedNotifications;
  }
  try {
    cachedNotifications = require("expo-notifications");
    return cachedNotifications;
  } catch (err) {
    console.log("expo-notifications not available in current runtime.");
    return null;
  }
}

// 3. Configure foreground presentation handler ONLY in standalone / Gradle builds
const notifModule = getNotificationsModule();
if (notifModule && notifModule.setNotificationHandler) {
  try {
    notifModule.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  } catch (e) {
    console.warn("Notifications handler setup notice:", e);
  }
}

let notificationListeners: Array<(notif: AppNotification) => void> = [];
const triggeredNotificationCache = new Set<string>();

// 4. Set up Android Notification Channels (only in standalone Gradle APK)
export async function setupAndroidNotificationChannels() {
  const notifs = getNotificationsModule();
  if (!notifs) return;

  if (Platform.OS === "android" && notifs.setNotificationChannelAsync) {
    try {
      await notifs.setNotificationChannelAsync("mausam-emergency", {
        name: "Emergency Weather & Safety Alerts",
        importance: notifs.AndroidImportance?.MAX ?? 5,
        vibrationPattern: [0, 400, 200, 400],
        lightColor: "#DC2626",
        sound: "default",
      });

      await notifs.setNotificationChannelAsync("mausam-activities", {
        name: "Daily Activity Windows",
        importance: notifs.AndroidImportance?.HIGH ?? 4,
        vibrationPattern: [0, 200, 100, 200],
        lightColor: "#38BDF8",
        sound: "default",
      });
    } catch (err) {
      console.warn("Error registering notification channels:", err);
    }
  }
}

export function addNotificationListener(listener: (notif: AppNotification) => void) {
  notificationListeners.push(listener);
  return () => {
    notificationListeners = notificationListeners.filter((l) => l !== listener);
  };
}

/**
 * Dispatches notifications:
 * - Standalone Gradle APK: Fires REAL native Android system notifications into status bar tray.
 * - Expo Go: Fires in-app alerts safely without loading expo-notifications.
 */
export async function triggerRealSystemNotification(
  title: string,
  message: string,
  severity: "emergency" | "warning" | "optimal" | "info" = "optimal",
  type: "weather_alert" | "activity_window" | "uv_safety" | "general" | "emergency_broadcast" = "weather_alert",
  data?: any
): Promise<AppNotification> {
  const fullNotif: AppNotification = {
    id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    title,
    message,
    severity,
    type,
    timestamp: new Date().toISOString(),
    data,
  };

  const notifs = getNotificationsModule();
  if (notifs && notifs.scheduleNotificationAsync) {
    try {
      await notifs.scheduleNotificationAsync({
        content: {
          title,
          body: message,
          sound: true,
          priority:
            severity === "emergency"
              ? notifs.AndroidNotificationPriority?.MAX
              : notifs.AndroidNotificationPriority?.HIGH,
          data: {
            ...data,
            severity,
            type,
          },
        },
        trigger: null,
      });
    } catch (err) {
      console.warn("Native notification dispatch notice:", err);
    }
  }

  // Broadcast to in-app listeners (smooth in both Expo Go & standalone)
  notificationListeners.forEach((listener) => listener(fullNotif));

  return fullNotif;
}

/**
 * Evaluates embedded JSON notification rules against user interests & live weather
 */
export async function evaluateAndTriggerActivityNotifications(
  userActivities: string[],
  weather: WeatherTelemetry
): Promise<AppNotification | null> {
  const { activityRules, environmentalAlerts } = notificationRulesData as any;

  // 1. Environmental safety alerts
  for (const envAlert of environmentalAlerts) {
    const c = envAlert.condition;
    let matches = true;

    if (c.minUv !== undefined && (weather.uvIndex || 0) < c.minUv) matches = false;
    if (c.minPrecipitation !== undefined && weather.precipitation < c.minPrecipitation) matches = false;
    if (c.minWind !== undefined && weather.windSpeed < c.minWind) matches = false;

    if (matches) {
      const cacheKey = `env-${envAlert.trigger}-${new Date().getHours()}`;
      if (!triggeredNotificationCache.has(cacheKey)) {
        triggeredNotificationCache.add(cacheKey);
        return await triggerRealSystemNotification(
          envAlert.title,
          envAlert.message,
          envAlert.severity || "warning",
          envAlert.type || "weather_alert"
        );
      }
    }
  }

  // 2. User activity rules
  for (const activity of activityRules) {
    if (!userActivities.includes(activity.activityId)) continue;

    for (const rule of activity.rules) {
      const c = rule.conditions;
      let matches = true;

      if (c.minTemp !== undefined && weather.temp < c.minTemp) matches = false;
      if (c.maxTemp !== undefined && weather.temp > c.maxTemp) matches = false;
      if (c.minWind !== undefined && weather.windSpeed < c.minWind) matches = false;
      if (c.maxWind !== undefined && weather.windSpeed > c.maxWind) matches = false;
      if (c.minPrecipitation !== undefined && weather.precipitation < c.minPrecipitation) matches = false;
      if (c.maxPrecipitation !== undefined && weather.precipitation > c.maxPrecipitation) matches = false;

      if (matches) {
        const cacheKey = `act-${activity.activityId}-${rule.trigger}-${new Date().getHours()}`;
        if (!triggeredNotificationCache.has(cacheKey)) {
          triggeredNotificationCache.add(cacheKey);
          return await triggerRealSystemNotification(
            rule.title,
            rule.message,
            rule.severity || "optimal",
            rule.type || "activity_window",
            { activity: activity.activityName }
          );
        }
      }
    }
  }

  return null;
}

// Initialize Push Notifications
export async function initializePushNotifications(
  userActivities: string[] = ["surfing", "cycling"],
  userName: string = "Alex River"
): Promise<string | null> {
  try {
    const notifs = getNotificationsModule();
    if (!notifs) {
      console.log("Expo Go or notification-free environment: Simulated push session active.");
      return "simulated-expo-go-token";
    }

    await setupAndroidNotificationChannels().catch(() => {});

    let finalStatus = "undetermined";
    try {
      const existing = await notifs.getPermissionsAsync().catch(() => null);
      finalStatus = existing?.status || "undetermined";

      if (finalStatus !== "granted") {
        const requested = await notifs.requestPermissionsAsync().catch(() => null);
        finalStatus = requested?.status || "denied";
      }
    } catch {
      // Non-fatal
    }

    let token = "";
    try {
      const expoPushToken = await notifs.getExpoPushTokenAsync().catch(() => null);
      token = expoPushToken?.data || "";
    } catch {
      token = "";
    }

    if (!token) {
      token = `ExponentPushToken[mausam-${encodeURIComponent(
        userName.toLowerCase().replace(/\s+/g, "-")
      )}-${Date.now().toString(36)}]`;
    }

    await registerPushToken(token, userActivities, userName).catch(() => {});
    return token;
  } catch (err) {
    console.warn("Push notification initialization notice:", err);
    return null;
  }
}

// Trigger a live notification from backend & present it
export async function triggerLiveWeatherPush(
  title: string = "🏄 Prime Surfing Window Active!",
  message: string = "Clean offshore wind (12 km/h) and moderate temperature. Ideal wave conditions right now!",
  severity: "emergency" | "warning" | "optimal" | "info" = "optimal"
) {
  try {
    await sendPushAlert(title, message, { severity });
  } catch (err) {
    console.warn("Backend push dispatch notice:", err);
  }

  return await triggerRealSystemNotification(
    title,
    message,
    severity,
    severity === "emergency" ? "emergency_broadcast" : "weather_alert"
  );
}
