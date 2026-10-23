/**
 * The single source of truth for every outbound destination and editable
 * product fact on this site.
 *
 *  1. Fill in values here (or in .env / the Vercel dashboard).
 *  2. Nothing is invented: an unset or malformed link renders a disabled
 *     "coming soon" control, never href="#".
 */

const env = (value: string | undefined): string => (value ?? "").trim();

export type LinkKey =
  | "app"
  | "extension"
  | "privacy"
  | "github"
  | "linkedin"
  | "instagram"
  | "youtube"
  | "x";

export const links: Record<LinkKey, string> = {
  app: env(import.meta.env.VITE_APP_URL),
  extension: env(import.meta.env.VITE_EXTENSION_URL),
  privacy: env(import.meta.env.VITE_PRIVACY_URL),
  github: env(import.meta.env.VITE_GITHUB_URL),
  linkedin: env(import.meta.env.VITE_LINKEDIN_URL),
  instagram: env(import.meta.env.VITE_INSTAGRAM_URL),
  youtube: env(import.meta.env.VITE_YOUTUBE_URL),
  x: env(import.meta.env.VITE_X_URL),
};

export const contactEmail = env(import.meta.env.VITE_CONTACT_EMAIL);
export const contactFormUrl = env(import.meta.env.VITE_CONTACT_URL);
export const hackathonName = env(import.meta.env.VITE_HACKATHON_NAME);

export type Status = "live" | "beta" | "planned";

export interface Capability {
  name: string;
  detail: string;
  status: Status;
}

export const capabilities: Capability[] = [
  {
    name: "Read Screen",
    detail: "Reads the writing on a lecture frame aloud. Uses the server's vision key.",
    status: "live",
  },
  {
    name: "Voice commands",
    detail: "Pause, play, rewind, forward, speed, captions, fullscreen and more.",
    status: "live",
  },
  {
    name: "Focus mode",
    detail: "Hides the sidebar, comments and chat on YouTube.",
    status: "live",
  },
  {
    name: "Reading themes",
    detail: "High-contrast and yellow-on-black themes for long sessions.",
    status: "live",
  },
  {
    name: "Large control bar",
    detail: "Bigger targets for players and controls that are hard to click.",
    status: "live",
  },
  {
    name: "Auto captions",
    detail: "Turns on YouTube captions wherever the lecture already has them.",
    status: "live",
  },
  {
    name: "Physics Wallah & Unacademy tuning",
    detail: "Basic support today; player-specific polish is still landing.",
    status: "beta",
  },
  {
    name: "Dyslexia-friendly fonts",
    detail: "A dedicated reading face inside the extension.",
    status: "planned",
  },
  {
    name: "Live captions & sound alerts",
    detail: "Real-time captions and non-speech audio cues.",
    status: "planned",
  },
];

export const shortcuts: { keys: string[]; label: string }[] = [
  { keys: ["F"], label: "Focus mode" },
  { keys: ["G"], label: "Voice commands" },
  { keys: ["H"], label: "Read Screen" },
  { keys: ["Esc"], label: "Stop speaking" },
  { keys: ["?"], label: "List shortcuts" },
];

export interface TeamMember {
  name: string;
  role: string;
  link?: string;
}

/** Add `{ name, role, link }` entries to publish the team grid. */
export const team: TeamMember[] = [];

export const platform = {
  name: "Gyaansetu",
  hindi: "ज्ञानसेतु",
  tagline: "Knowledge should reach everyone.",
  taglineSecond: "We build the bridge.",
  supporting:
    "Gyaansetu reshapes YouTube, Physics Wallah and Unacademy lectures around how you see, hear, read and move.",
  metaDescription:
    "An accessibility-first learning platform. Set up your profile once and carry it across YouTube, Physics Wallah and Unacademy with the Gyaansetu app and extension.",
};

export const sectionIds = ["home", "about", "app", "extension", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];
