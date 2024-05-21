import {
  Before,
  After,
  setDefaultTimeout,
  BeforeAll,
  AfterAll,
} from "@cucumber/cucumber";

import dotenv from "dotenv"
import { Browser, BrowserContext, Page, chromium, firefox } from "playwright";
import { test, expect } from "@playwright/test";

setDefaultTimeout(1000 * 60 * 2);

let browser: Browser;
let bCtx: BrowserContext;
let page: Page;

BeforeAll(async function () {

  dotenv.config();
  let browserType =process.env.browser;
  switch (browserType) {
    case 'chrome':
      browser = await chromium.launch({
        headless: false,
        channel: "chrome",
        args: ["--start-maximized"],
      });

      break;
    case "edge":
      browser = await chromium.launch({
        headless: false,
        channel: "msedge",
        args: ["--start-maximized"],
      });

      break;
    case "firefox":
      browser = await firefox.launch({
        headless: false,
        args: ["--start-maximized"],
      });

      break;

    default:
      throw new Error(`invalid browser type ${[browserType]}`)
      
  }
});

Before(async function () {

  bCtx = await browser.newContext({ viewport: null, javaScriptEnabled: true });
  page = await bCtx.newPage();
  await page.goto(process.env.application_url!);
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
