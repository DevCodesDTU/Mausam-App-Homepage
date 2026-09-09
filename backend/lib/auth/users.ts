import fs from "fs";
import path from "path";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

function getUsersFilePath(): string {
  const possiblePaths = [
    path.join(process.cwd(), "users.json"),
    path.join(process.cwd(), "backend", "users.json"),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  // If running from root directory, prefer backend/users.json if backend folder exists
  const backendUsersPath = path.join(process.cwd(), "backend", "users.json");
  if (fs.existsSync(path.join(process.cwd(), "backend"))) {
    return backendUsersPath;
  }

  // Fallback default
  return path.join(process.cwd(), "users.json");
}

export function readUsers(): UserRecord[] {
  const filePath = getUsersFilePath();
  try {
    if (!fs.existsSync(filePath)) {
      // Initialize with empty array if file does not exist
      fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading users.json:", err);
    return [];
  }
}

export function writeUsers(users: UserRecord[]): boolean {
  const filePath = getUsersFilePath();
  try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing users.json:", err);
    return false;
  }
}

export function findUserByEmail(email: string): UserRecord | undefined {
  const users = readUsers();
  const normalized = email.trim().toLowerCase();
  return users.find((u) => u.email.trim().toLowerCase() === normalized);
}

export function createUser(name: string, email: string, password: string): { success: boolean; user?: Omit<UserRecord, "password">; error?: string } {
  const normalizedEmail = email.trim().toLowerCase();
  const trimmedName = name.trim();

  if (!trimmedName) {
    return { success: false, error: "Name is required" };
  }
  if (!normalizedEmail || !normalizedEmail.includes("@")) {
    return { success: false, error: "A valid email address is required" };
  }
  if (!password || password.length < 4) {
    return { success: false, error: "Password must be at least 4 characters long" };
  }

  const existing = findUserByEmail(normalizedEmail);
  if (existing) {
    return { success: false, error: "An account with this email already exists" };
  }

  const users = readUsers();
  const newUser: UserRecord = {
    id: `usr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
    name: trimmedName,
    email: normalizedEmail,
    password: password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  const saved = writeUsers(users);
  if (!saved) {
    return { success: false, error: "Failed to save user record to users.json" };
  }

  const { password: _, ...safeUser } = newUser;
  return { success: true, user: safeUser };
}

export function authenticateUser(email: string, password: string): { success: boolean; user?: Omit<UserRecord, "password">; error?: string; statusCode?: number } {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    return { success: false, error: "Email address is required", statusCode: 400 };
  }
  if (!password) {
    return { success: false, error: "Password is required", statusCode: 400 };
  }

  const user = findUserByEmail(normalizedEmail);
  if (!user) {
    return { success: false, error: "No account found with this email", statusCode: 404 };
  }

  if (user.password !== password) {
    return { success: false, error: "Incorrect password. Please try again.", statusCode: 401 };
  }

  const { password: _, ...safeUser } = user;
  return { success: true, user: safeUser, statusCode: 200 };
}

