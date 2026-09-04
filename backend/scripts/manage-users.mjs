#!/usr/bin/env node

/**
 * Mausam Backend Users Management CLI Script
 * 
 * Usage:
 *   node scripts/manage-users.mjs --list
 *   node scripts/manage-users.mjs --verify --email "alex.river@example.com" --password "password123"
 *   node scripts/manage-users.mjs --add --name "Sara Connor" --email "sara@example.com" --password "secret123"
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Locate users.json
const usersPath = path.join(__dirname, "..", "users.json");

function loadUsers() {
  try {
    if (!fs.existsSync(usersPath)) {
      fs.writeFileSync(usersPath, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    const raw = fs.readFileSync(usersPath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading users.json:", err.message);
    return [];
  }
}

function saveUsers(users) {
  try {
    const tempPath = `${usersPath}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(users, null, 2), "utf-8");
    fs.renameSync(tempPath, usersPath);
    return true;
  } catch (err) {
    console.error("Error saving users.json:", err.message);
    return false;
  }
}

const args = process.argv.slice(2);

function getArg(flag) {
  const index = args.indexOf(flag);
  if (index !== -1 && index + 1 < args.length) {
    return args[index + 1];
  }
  return null;
}

const isList = args.includes("--list") || args.includes("-l");
const isVerify = args.includes("--verify") || args.includes("-v");
const isAdd = args.includes("--add") || args.includes("-a");

console.log("\n================================================");
console.log("🌦️  MAUSAM BACKEND USER MANAGEMENT CLI");
console.log(`📁  Target File: ${usersPath}`);
console.log("================================================\n");

if (isList || (!isVerify && !isAdd)) {
  const users = loadUsers();
  console.log(`Found ${users.length} registered user(s) in users.json:\n`);
  users.forEach((u, i) => {
    console.log(`[${i + 1}] ID:        ${u.id}`);
    console.log(`    Name:      ${u.name}`);
    console.log(`    Email:     ${u.email}`);
    console.log(`    Password:  ${u.password}`);
    console.log(`    Created:   ${u.createdAt}`);
    console.log("------------------------------------------------");
  });
  if (users.length === 0) {
    console.log("No users found in users.json.");
  }
} else if (isVerify) {
  const email = getArg("--email");
  const password = getArg("--password");

  if (!email || !password) {
    console.error("❌ Error: Both --email and --password are required for verification.");
    process.exit(1);
  }

  const users = loadUsers();
  const normalized = email.trim().toLowerCase();
  const user = users.find((u) => u.email.trim().toLowerCase() === normalized);

  if (!user) {
    console.log(`❌ Search Result: No user found with email "${email}" in users.json.`);
    process.exit(1);
  }

  if (user.password !== password) {
    console.log(`❌ Search Result: User "${user.name}" (${user.email}) found, but PASSWORD DOES NOT MATCH.`);
    process.exit(1);
  }

  console.log(`✅ Authentication SUCCESSFUL!`);
  console.log(`   User ID:   ${user.id}`);
  console.log(`   Name:      ${user.name}`);
  console.log(`   Email:     ${user.email}`);
  console.log(`   Created:   ${user.createdAt}\n`);
} else if (isAdd) {
  const name = getArg("--name");
  const email = getArg("--email");
  const password = getArg("--password");

  if (!name || !email || !password) {
    console.error("❌ Error: --name, --email, and --password are all required to add a user.");
    process.exit(1);
  }

  const users = loadUsers();
  const normalized = email.trim().toLowerCase();
  const exists = users.find((u) => u.email.trim().toLowerCase() === normalized);

  if (exists) {
    console.log(`❌ Error: User with email "${email}" already exists in users.json (ID: ${exists.id}).`);
    process.exit(1);
  }

  const newUser = {
    id: `usr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
    name: name.trim(),
    email: normalized,
    password: password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  console.log(`✅ New user created successfully in users.json!`);
  console.log(`   User ID:   ${newUser.id}`);
  console.log(`   Name:      ${newUser.name}`);
  console.log(`   Email:     ${newUser.email}`);
  console.log(`   Password:  ${newUser.password}\n`);
}

