/**
 * Link readiness rules (PRD §5).
 * A destination is usable only when it is an absolute https:// URL.
 * http://localhost is allowed in development so local testing stays possible.
 */

export interface LinkOptions {
  isDev?: boolean;
}

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

export function isReadyLink(
  value: string | undefined | null,
  { isDev = false }: LinkOptions = {},
): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return false;
  }

  if (url.protocol === "https:") return true;
  if (isDev && url.protocol === "http:" && LOCAL_HOSTS.has(url.hostname)) return true;
  return false;
}

export function isMailto(value: string | undefined | null): boolean {
  if (!value) return false;
  return /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isEmail(value: string | undefined | null): boolean {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function mailtoFor(email: string): string {
  return `mailto:${email.trim()}`;
}

/** Console warning that names missing destinations in development. */
export function reportMissingLinks(values: Record<string, string>): string[] {
  const missing = Object.entries(values)
    .filter(([, value]) => !isReadyLink(value, { isDev: import.meta.env.DEV }))
    .map(([key]) => key);

  if (import.meta.env.DEV && missing.length > 0) {
    console.warn(
      `[Gyaansetu] Unset or invalid links: ${missing.join(", ")}. ` +
        `Set them in src/siteConfig.ts or as VITE_* environment variables.`,
    );
  }
  return missing;
}

export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
