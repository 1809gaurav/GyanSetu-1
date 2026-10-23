import { isReadyLink, isEmail, isMailto } from "./links";

describe("isReadyLink", () => {
  it("rejects empty values", () => {
    expect(isReadyLink("")).toBe(false);
    expect(isReadyLink(undefined)).toBe(false);
    expect(isReadyLink("   ")).toBe(false);
  });

  it("rejects relative or bare values", () => {
    expect(isReadyLink("#")).toBe(false);
    expect(isReadyLink("/app")).toBe(false);
    expect(isReadyLink("app.example.com")).toBe(false);
    expect(isReadyLink("javascript:alert(1)")).toBe(false);
  });

  it("accepts absolute https URLs", () => {
    expect(isReadyLink("https://app.gyansetu.in")).toBe(true);
    expect(isReadyLink("https://chromewebstore.google.com/detail/xyz")).toBe(true);
  });

  it("accepts http only for localhost in development", () => {
    expect(isReadyLink("http://localhost:3000", { isDev: true })).toBe(true);
    expect(isReadyLink("http://127.0.0.1:5173", { isDev: true })).toBe(true);
    expect(isReadyLink("http://localhost:3000", { isDev: false })).toBe(false);
    expect(isReadyLink("http://app.gyansetu.in", { isDev: true })).toBe(false);
  });
});

describe("contact helpers", () => {
  it("validates emails", () => {
    expect(isEmail("hello@gyansetu.in")).toBe(true);
    expect(isEmail("hello")).toBe(false);
    expect(isEmail("")).toBe(false);
  });

  it("validates mailto values", () => {
    expect(isMailto("mailto:hello@gyansetu.in")).toBe(true);
    expect(isMailto("https://example.com")).toBe(false);
  });
});
