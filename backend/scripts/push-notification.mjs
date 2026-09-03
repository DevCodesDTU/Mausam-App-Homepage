 /*
 * Usage Examples:
 *   node scripts/push-notification.mjs --preset tsunami
 *   node scripts/push-notification.mjs --preset cyclone
 *   node scripts/push-notification.mjs --preset simple
 *   node scripts/push-notification.mjs --file scripts/sample-notification.json
 *   node scripts/push-notification.mjs --title "Rain Alert" --message "Light showers in 20 mins"
 *   node scripts/push-notification.mjs --list
 *   node scripts/push-notification.mjs --url "https://your-hosted-backend.com" --key "your_secret_key"
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default configuration (can be overridden via CLI args or environment variables)
const DEFAULT_BACKEND_URL = process.env.MAUSAM_BACKEND_URL || 'http://localhost:3000';
const DEFAULT_ADMIN_KEY = process.env.MAUSAM_ADMIN_API_KEY || process.env.ADMIN_API_KEY || 'mausam_secret_admin_key_2026';

// Built-in Presets for Emergency Broadcasts, Activity Windows, and Simple Announcements
const PRESETS = {
  // --- EMERGENCY BROADCASTS ---
  tsunami: {
    title: '🚨 URGENT TSUNAMI WARNING & EVACUATION',
    message: 'Tsunami waves detected along coastal regions following offshore seismic activity. Move inland to high ground immediately!',
    type: 'emergency_broadcast',
    severity: 'emergency',
    targetActivity: 'all',
    data: { emergencyType: 'tsunami', urgency: 'immediate', actionRequired: 'evacuate_to_high_ground' },
  },
  cyclone: {
    title: '🌪️ SEVERE CYCLONE & GALE FORCE WARNING',
    message: 'Extreme wind gusts exceeding 100 km/h and heavy rainfall expected within 3 hours. Stay indoors and secure loose structures.',
    type: 'emergency_broadcast',
    severity: 'emergency',
    targetActivity: 'all',
    data: { emergencyType: 'cyclone', windVelocity: '100+ km/h', severity: 'critical' },
  },
  flood: {
    title: '🌊 FLASH FLOOD EMERGENCY ADVISORY',
    message: 'Rapidly rising water levels in low-lying areas. Avoid driving through flooded roads and move to elevated safety.',
    type: 'emergency_broadcast',
    severity: 'emergency',
    targetActivity: 'all',
    data: { emergencyType: 'flash_flood', riskLevel: 'high' },
  },
  heatwave: {
    title: '🔥 EXTREME HEAT WAVE HEALTH ADVISORY',
    message: 'Ambient heat index soaring above 42°C. Stay hydrated, avoid prolonged direct sunlight, and check on vulnerable individuals.',
    type: 'weather_alert',
    severity: 'warning',
    targetActivity: 'all',
    data: { tempMax: '42°C', advisory: 'hydration_heat_safety' },
  },

  // --- SIMPLE COMMUNITY ANNOUNCEMENT ---
  simple: {
    title: '📢 Mausam Community Update',
    message: 'New high-resolution radar forecasts and real-time activity metrics are now live in your area. Check out the updated 24h timeline!',
    type: 'general',
    severity: 'info',
    targetActivity: 'all',
    data: { category: 'announcement', version: '2.0' },
  },

  // --- ACTIVITY WINDOW PRESETS ---
  surf: {
    title: '🏄 Offshore Swell Peak Alert!',
    message: 'Wind dropping to 12 km/h with clean 1.8m swell at 2:30 PM. Perfect 95% surf window open!',
    type: 'activity_window',
    severity: 'optimal',
    targetActivity: 'surfing',
    data: { activity: 'Surfing', score: 95, window: '2:30 PM - 5:15 PM' },
  },
  cycling: {
    title: '🚴 Prime Cycling Window Open!',
    message: 'Dry tarmac, gentle 8 km/h tailwinds, and mild 21°C temperature until 6:00 PM.',
    type: 'activity_window',
    severity: 'optimal',
    targetActivity: 'cycling',
    data: { activity: 'Cycling', score: 92, window: '3:00 PM - 6:00 PM' },
  },
  wind: {
    title: '⚡ High Wind Gust Advisory',
    message: 'Coastal gusts reaching 28 km/h. Exercise caution along exposed ridges and open roads.',
    type: 'weather_alert',
    severity: 'warning',
    targetActivity: 'all',
    data: { windSpeed: '28 km/h', severity: 'moderate' },
  },
  uv: {
    title: '☀️ UV Index Alert (Level 8 - High)',
    message: 'Peak sun intensity from 11:30 AM to 3:00 PM. SPF 50+ and eye protection recommended.',
    type: 'uv_safety',
    severity: 'warning',
    targetActivity: 'all',
    data: { uvIndex: 8, advisory: 'SPF 50+ advised' },
  },
  rain: {
    title: '🌧️ Passing Rain Showers Detected',
    message: 'Brief drizzle expected in your area starting in approx 15 minutes. 45% precipitation chance.',
    type: 'weather_alert',
    severity: 'warning',
    targetActivity: 'all',
    data: { precipitationChance: 45, duration: '30 mins' },
  },
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    url: DEFAULT_BACKEND_URL,
    key: DEFAULT_ADMIN_KEY,
    file: null,
    preset: null,
    title: null,
    message: null,
    type: 'weather_alert',
    severity: 'optimal',
    target: null,
    list: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') options.help = true;
    else if (arg === '--list' || arg === '-l') options.list = true;
    else if ((arg === '--file' || arg === '-f') && args[i + 1]) options.file = args[++i];
    else if ((arg === '--preset' || arg === '-p') && args[i + 1]) options.preset = args[++i];
    else if ((arg === '--url' || arg === '-u') && args[i + 1]) options.url = args[++i];
    else if ((arg === '--key' || arg === '-k') && args[i + 1]) options.key = args[++i];
    else if ((arg === '--title' || arg === '-t') && args[i + 1]) options.title = args[++i];
    else if ((arg === '--message' || arg === '--body' || arg === '-m') && args[i + 1]) options.message = args[++i];
    else if (arg === '--type' && args[i + 1]) options.type = args[++i];
    else if (arg === '--severity' && args[i + 1]) options.severity = args[++i];
    else if (arg === '--target' && args[i + 1]) options.target = args[++i];
  }

  return options;
}

function printHelp() {
  console.log(`
============================================================================
MAUSAM PUSH NOTIFICATION ADMIN CLI
============================================================================
Send secure push notifications to all or filtered mobile devices.

PRESET BROADCASTS:
  --preset tsunami        🚨 Urgent Tsunami Warning & Evacuation
  --preset cyclone        🌪️ Severe Cyclone & Gale Warning
  --preset flood          🌊 Flash Flood Emergency Advisory
  --preset heatwave       🔥 Extreme Heat Wave Health Alert
  --preset simple         📢 General Community Update / Announcement
  --preset surf           🏄 Prime Surfing Swell Window
  --preset cycling        🚴 Optimal Cycling Road Window
  --preset wind           ⚡ High Wind Advisory
  --preset uv             ☀️ UV Index Warning
  --preset rain           🌧️ Approaching Rain Showers

COMMAND OPTIONS:
  --file, -f <path>       Path to JSON file containing notification payload
  --preset, -p <name>     Use one of the pre-configured presets above
  --title, -t <string>    Notification Title
  --message, -m <string>  Notification Message text
  --severity <string>     'emergency' | 'warning' | 'optimal' | 'info'
  --target <activity>     Target specific interest ("surfing", "cycling", "all")
  --type <string>         Category: 'emergency_broadcast' | 'weather_alert' | 'activity_window' | 'general'
  --url, -u <url>         Backend API Base URL (default: ${DEFAULT_BACKEND_URL})
  --key, -k <key>         Admin Secret API Key
  --list, -l              List registered devices count and recent dispatch history
  --help, -h              Display this help guide

EXAMPLES:
  node scripts/push-notification.mjs --preset tsunami
  node scripts/push-notification.mjs --preset simple
  node scripts/push-notification.mjs --file scripts/sample-notification.json
  node scripts/push-notification.mjs --list
============================================================================
`);
}

async function listDevicesAndHistory(backendUrl, adminKey) {
  console.log(`\n🔍 Querying backend at: ${backendUrl}/api/notifications ...`);
  try {
    const res = await fetch(`${backendUrl}/api/notifications`, {
      headers: {
        Authorization: `Bearer ${adminKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`❌ Authorization/Server error (${res.status}):`, err);
      process.exit(1);
    }

    const data = await res.json();
    console.log(`\n============================================================================`);
    console.log(`📊 CONNECTED DEVICES STATUS`);
    console.log(`============================================================================`);
    console.log(`Total Registered Devices: ${data.totalRegisteredDevices || data.totalDevices || 0}`);
    if (data.devices && data.devices.length > 0) {
      console.log(`\nRegistered Devices:`);
      data.devices.forEach((d, i) => {
        console.log(`  [${i + 1}] User: ${d.userId} | Platform: ${d.platform} | Passions: ${d.activities.join(', ')}`);
      });
    }
    if (data.recentDispatches && data.recentDispatches.length > 0) {
      console.log(`\nRecent Dispatches:`);
      data.recentDispatches.slice(-5).forEach((d) => {
        console.log(`  • [${d.timestamp}] (${d.type}) "${d.title}" -> ${d.targetTokensCount} devices`);
      });
    }
    console.log(`============================================================================\n`);
  } catch (err) {
    console.error(`❌ Connection failed to ${backendUrl}:`, err.message);
    process.exit(1);
  }
}

async function sendNotification(backendUrl, adminKey, payload) {
  console.log(`\n📡 Dispatching Push Notification to: ${backendUrl}/api/notifications`);
  console.log(`----------------------------------------------------------------------------`);
  console.log(`Title:     "${payload.title}"`);
  console.log(`Message:   "${payload.message || payload.body}"`);
  console.log(`Severity:  ${payload.severity || 'optimal'}`);
  console.log(`Type:      ${payload.type || 'weather_alert'}`);
  console.log(`Target:    ${payload.targetActivity || payload.target || 'all users'}`);
  console.log(`----------------------------------------------------------------------------`);

  const requestBody = {
    action: 'send',
    title: payload.title,
    message: payload.message || payload.body,
    type: payload.type || 'weather_alert',
    severity: payload.severity || 'optimal',
    targetActivity: payload.targetActivity || payload.target,
    data: payload.data || {},
  };

  try {
    const res = await fetch(`${backendUrl}/api/notifications`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${adminKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await res.json();

    if (!res.ok || !responseData.success) {
      console.error(`\n❌ Dispatch Rejected (${res.status}):`, responseData.error || responseData);
      process.exit(1);
    }

    console.log(`\n✅ PUSH NOTIFICATION DELIVERED SUCCESSFULLY!`);
    console.log(`Dispatch ID:      ${responseData.dispatchId || 'confirmed'}`);
    console.log(`Devices Reached:  ${responseData.summary?.devicesReached ?? 0}`);
    console.log(`Timestamp:        ${responseData.summary?.timestamp || new Date().toISOString()}`);
    console.log(`============================================================================\n`);
  } catch (err) {
    console.error(`\n❌ Failed to communicate with backend:`, err.message);
    console.log(`💡 Make sure your backend is running (e.g. 'npm run dev' in /backend) or specify --url <remote_url>`);
    process.exit(1);
  }
}

async function main() {
  const options = parseArgs();

  if (options.help) {
    printHelp();
    return;
  }

  if (options.list) {
    await listDevicesAndHistory(options.url, options.key);
    return;
  }

  let payload = null;

  // 1. Check if JSON file was specified
  if (options.file) {
    const filePath = path.isAbsolute(options.file) ? options.file : path.resolve(process.cwd(), options.file);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Error: JSON file not found at: ${filePath}`);
      process.exit(1);
    }
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      payload = JSON.parse(fileContent);
    } catch (e) {
      console.error(`❌ Error parsing JSON file:`, e.message);
      process.exit(1);
    }
  }
  // 2. Check if preset was specified
  else if (options.preset) {
    const presetKey = options.preset.toLowerCase();
    if (!PRESETS[presetKey]) {
      console.error(`❌ Invalid preset '${options.preset}'. Available presets: ${Object.keys(PRESETS).join(', ')}`);
      process.exit(1);
    }
    payload = PRESETS[presetKey];
  }
  // 3. Check if CLI flags were passed
  else if (options.title && options.message) {
    payload = {
      title: options.title,
      message: options.message,
      type: options.type,
      severity: options.severity,
      targetActivity: options.target,
    };
  }
  // 4. Fallback default notification
  else {
    console.log(`ℹ️  No payload or preset specified. Using default surf preset. Use --help to view options.`);
    payload = PRESETS.surf;
  }

  await sendNotification(options.url, options.key, payload);
}

main().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
