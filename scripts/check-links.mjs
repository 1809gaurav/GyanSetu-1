#!/usr/bin/env node
/**
 * Link health check (PRD §5).
 * Requests every configured destination and prints PASS / FAIL / NOT SET.
 *
 * Usage: npm run check-links
 * Reads VITE_* values from .env, .env.local or the process environment.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const envFiles = [".env", ".env.local", ".env.production"];
const parsed = { ...process.env };

for (const file of envFiles) {
  const fullPath = resolve(process.cwd(), file);
  if (!existsSync(fullPath)) continue;
  for (const line of readFileSync(fullPath, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const [, key, raw] = match;
    if (!(key in process.env)) parsed[key] = raw.replace(/^["']|["']$/g, "");
  }
}

const targets = [
  ["app", "VITE_APP_URL"],
  ["extension", "VITE_EXTENSION_URL"],
  ["privacy", "VITE_PRIVACY_URL"],
  ["contact page", "VITE_CONTACT_URL"],
  ["github", "VITE_GITHUB_URL"],
  ["linkedin", "VITE_LINKEDIN_URL"],
  ["instagram", "VITE_INSTAGRAM_URL"],
  ["youtube", "VITE_YOUTUBE_URL"],
  ["x", "VITE_X_URL"],
];

const contactEmail = parsed.VITE_CONTACT_EMAIL?.trim();
if (contactEmail) console.log(`PASS  contact email  ${contactEmail}`);

let failures = 0;

for (const [label, key] of targets) {
  const value = parsed[key]?.trim();
  if (!value) {
    console.log(`NOT SET  ${label.padEnd(14)} ${key}`);
    continue;
  }

  let url;
  try {
    url = new URL(value);
  } catch {
    failures += 1;
    console.log(`FAIL  ${label.padEnd(14)} invalid URL: ${value}`);
    continue;
  }

  if (url.protocol !== "https:" && url.hostname !== "localhost") {
    failures += 1;
    console.log(`FAIL  ${label.padEnd(14)} must be https:// — ${value}`);
    continue;
  }

  const started = Date.now();
  try {
    const response = await fetch(value, {
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
      headers: { "user-agent": "Gyaansetu-LinkCheck/1.0" },
    });
    const ms = Date.now() - started;
    if (response.ok) {
      console.log(`PASS  ${label.padEnd(14)} ${response.status}  ${ms}ms  ${value}`);
    } else {
      failures += 1;
      console.log(`FAIL  ${label.padEnd(14)} ${response.status}  ${ms}ms  ${value}`);
    }
  } catch (error) {
    failures += 1;
    console.log(`FAIL  ${label.padEnd(14)} ${error.message}  ${value}`);
  }
}

console.log(
  failures === 0
    ? "\nAll configured links responded."
    : `\n${failures} configured link(s) failed.`,
);
process.exit(failures === 0 ? 0 : 1);
