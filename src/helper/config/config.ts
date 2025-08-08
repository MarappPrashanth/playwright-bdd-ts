import { LaunchOptions, BrowserContextOptions } from "@playwright/test";

loadEnv();

const isHeadless = process.env.HEADLESS !== "false";

export const firefoxBrowserOptions: LaunchOptions = {
  headless: isHeadless,
  args: ["--start-maximized"],
};

export const chromeBrowserOptions: LaunchOptions = {
  slowMo: process.env.SLOWMO ? Number(process.env.SLOWMO) : 0,
  headless: isHeadless,
  devtools: false,
  args: ["--start-maximized", "--disable-dev-shm-usage", "--no-sandbox"],
};

export const edgeBrowserOptions: LaunchOptions = {
  headless: isHeadless,
  args: ["--start-maximized"],
};

export const browserContextOptions: BrowserContextOptions = {
  viewport: {
    width: Number.parseInt(process.env.VIEWPORT_WIDTH || "1366", 10),
    height: Number.parseInt(process.env.VIEWPORT_HEIGHT || "768", 10),
  },
  javaScriptEnabled: true,
  ignoreHTTPSErrors: true,
  acceptDownloads: true,
  recordVideo: process.env.RECORD_VIDEO ? { dir: "./test-results/videos" } : undefined,
};

export function loadEnv() {
  const env = process.env.npm_config_env || "dev";
  require("dotenv").config({ path: `./src/helper/config/.env.${env}` });
}
