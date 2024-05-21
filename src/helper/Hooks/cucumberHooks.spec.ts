import {
  Before,
  After,
  setDefaultTimeout,
  BeforeAll,
  AfterAll,
  AfterStep,
  BeforeStep,
  Status,
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

Before(async function (scenario) {
  // bCtx = await browser.newContext({ viewport: null, javaScriptEnabled: true });
  scenario;
  bCtx = await browser.newContext(browserContextOptions);
  page = await bCtx.newPage();
  await page.goto(process.env.BASE_URL as string);
});

After(async function (scenario) {
  this.log(`--------${scenario.pickle.name} is ended--------`);
  this.log(`SCENARIO STATUS IS >>>>>> ${scenario.result?.status} -------`);
  if (scenario.result?.status == Status.FAILED) {
    this.log(`say cheese for snapshot!!!!`);
    const img = await page.screenshot({
      path: `./reports/${scenario.pickle.name}.png`,
    });
    this.attach(img, "image/png");
  }
  await page.close();
  await bCtx.close();
  await browser.close();
});

BeforeStep(async function (scenario) {
  this.log(`--------${scenario.pickleStep.text} is started--------`);
});

AfterStep(async function (scenario) {
  this.log(`--------${scenario.pickleStep.text} is ended--------`);
});

AfterAll(async function () {});
export function getPage(): Page {
  return page;
}
