import {
  Before,
  After,
  setDefaultTimeout,
  BeforeAll,
  AfterAll,
} from "@cucumber/cucumber";

import {
  Browser,
  BrowserContext,
  Page,
  chromium,
  firefox,
  webkit,
} from "playwright";

import {
  loadEnv,
  chromeBrowserOptions,
  firefoxBrowserOptions,
  edgeBrowserOptions,
  browserContextOptions,
} from "../config/config";

setDefaultTimeout(1000 * 60 * 2);

let browser: Browser;
let bCtx: BrowserContext;
let page: Page;

BeforeAll(async function () {
  loadEnv();
  const browserName = process.env.BROWSER ?? "chromium";
  switch (browserName) {
    case "chromium":
    case "chrome":
      browser = await chromium.launch(chromeBrowserOptions);
      break;
    case "firefox":
      browser = await firefox.launch(firefoxBrowserOptions);
      break;
    case "webkit":
      browser = await webkit.launch(edgeBrowserOptions);
      break;
    default:
      throw new Error(`invalid browser type ${browserName}`);
  }
});

Before(async function () {
  bCtx = await browser.newContext(browserContextOptions);
  page = await bCtx.newPage();
  if (!process.env.BASE_URL) {
    throw new Error("BASE_URL is not defined");
  }
  await page.goto(process.env.BASE_URL);
});

After(async function () {
  await page.close();
  await bCtx.close();
});

AfterAll(async function () {
  await browser.close();
});
export function getPage(): Page {
  return page;
}
