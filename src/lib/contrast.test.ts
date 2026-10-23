import { describe, expect, it } from "vitest";
import { ratio } from "./contrast";

/**
 * Palette pairs that are actually used on the site.
 * Body copy must clear 7:1 (PRD §6), large text / UI 4.5:1,
 * borders and focus rings 3:1.
 */
const palette = {
  paper: "#FAF7F1",
  paperDeep: "#F2EBDD",
  white: "#FFFFFF",
  navy950: "#050B1E",
  navy900: "#0A1633",
  ink: "#0F1A33",
  muted: "#4C5468",
  gold300: "#E8C468",
  gold400: "#D4AF37",
  gold500: "#B9922B",
  gold600: "#8F6C17",
  gold700: "#6C5010",
};

const bodyText: [string, string, string][] = [
  ["ink on paper", palette.ink, palette.paper],
  ["ink on white", palette.ink, palette.white],
  ["ink on paper-deep", palette.ink, palette.paperDeep],
  ["muted on paper", palette.muted, palette.paper],
  ["muted on white", palette.muted, palette.white],
  ["navy-900 on paper", palette.navy900, palette.paper],
  ["paper on navy-950", palette.paper, palette.navy950],
  ["paper on navy-900", palette.paper, palette.navy900],
  ["gold-300 on navy-900", palette.gold300, palette.navy900],
  ["gold-300 on navy-950", palette.gold300, palette.navy950],
  ["gold-700 on paper", palette.gold700, palette.paper],
];

const largeOrUI: [string, string, string][] = [
  ["navy-900 on gold-300", palette.navy900, palette.gold300],
  ["navy-900 on gold-400", palette.navy900, palette.gold400],
  ["gold-600 on paper", palette.gold600, palette.paper],
];

const borders: [string, string, string][] = [
  ["gold-600 on paper (focus ring)", palette.gold600, palette.paper],
  ["navy-900 on paper (outline)", palette.navy900, palette.paper],
];

describe("palette contrast", () => {
  it.each(bodyText)("%s meets 7:1 body text", (_label, fg, bg) => {
    expect(ratio(fg, bg)).toBeGreaterThanOrEqual(7);
  });

  it.each(largeOrUI)("%s meets 4.5:1 large text", (_label, fg, bg) => {
    expect(ratio(fg, bg)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(borders)("%s meets 3:1 UI contrast", (_label, fg, bg) => {
    expect(ratio(fg, bg)).toBeGreaterThanOrEqual(3);
  });
});
