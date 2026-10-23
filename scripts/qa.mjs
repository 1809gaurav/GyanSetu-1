import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const outDir = new URL("../.qa/", import.meta.url);
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath:
    "/Users/sakshamchauhan/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
  args: ["--enable-unsafe-webgpu", "--use-angle=metal"],
});

async function run(width, height, label) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));

  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.waitForTimeout(6000);

  const support = await page.evaluate(() => ({
    webgpu: "gpu" in navigator,
    webgl: !!document.createElement("canvas").getContext("webgl2"),
    canvases: [...document.querySelectorAll("canvas")].map((c) => `${c.width}x${c.height}`),
    height: document.documentElement.scrollHeight,
  }));

  await page.screenshot({ path: new URL(`${label}-hero.png`, outDir).pathname });
  await page.screenshot({ path: new URL(`${label}-full.png`, outDir).pathname, fullPage: true });

  const labels = { about: "About", app: "App", extension: "Extension", contact: "Contact" };
  for (const id of ["about", "app", "extension", "contact"]) {
    await page
      .getByRole("navigation", { name: "Sections", exact: true })
      .getByRole("link", { name: labels[id] })
      .click();
    await page.waitForTimeout(1800);
    await page.screenshot({ path: new URL(`${label}-${id}.png`, outDir).pathname });
  }

  console.log(label, JSON.stringify(support), errors.length ? errors : "no errors");
  await page.close();
}

await run(1440, 900, "desktop");
await run(390, 844, "mobile");

// Full-page review with motion off: every reveal is rendered, so the layout
// can be judged without scrolling through 7,000px first.
const reducePage = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
await reducePage.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await reducePage.waitForTimeout(2500);
await reducePage.screenshot({
  path: new URL("desktop-reduced-full.png", outDir).pathname,
  fullPage: true,
});
await reducePage.screenshot({
  path: new URL("desktop-reduced-hero.png", outDir).pathname,
});
await reducePage.close();

await browser.close();
