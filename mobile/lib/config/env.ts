import { Platform } from "react-native";

const getDefaultApiUrl = () => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  // Android emulator uses 10.0.2.2 for host machine localhost
  if (Platform.OS === "android") {
    return "http://10.0.2.2:3000";
  }
  return "http://localhost:3000";
};

export const env = {
  API_URL: getDefaultApiUrl(),
};
