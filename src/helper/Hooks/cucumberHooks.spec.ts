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
  ChromiumBrowser,
  FirefoxBrowser,
  webkit,
  WebKitBrowser,
  chromium,
  LaunchOptions,
  firefox,
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
  switch (process.env.BROWSER) {
    case "chrome":
      browser = await chromium.launch(chromeBrowserOptions);
      break;
    case "edge":
      browser = await chromium.launch(edgeBrowserOptions);
      break;
    case "firefox":
      browser = await firefox.launch(firefoxBrowserOptions);
      break;
    default:
      throw new Error(`invalid browser type ${[process.env.BROWSE]}`);
  }
});

Before(async function () {
  // bCtx = await browser.newContext({ viewport: null, javaScriptEnabled: true });
  bCtx = await browser.newContext(browserContextOptions);
  page = await bCtx.newPage();
  await page.goto(process.env.BASE_URL as string);
});

After(async function () {
  await page.close();
  await bCtx.close();
  await browser.close();
});

AfterAll(async function () {});
export function getPage(): Page {
  return page;
}
