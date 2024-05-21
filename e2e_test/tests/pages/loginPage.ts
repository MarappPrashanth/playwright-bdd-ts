import { Page } from "playwright";
import * as LoginPageLocators from "../locators/loginPageLocators.json";
import basePage from "../pages/basePage";


export default class loginPage extends basePage {
 
  constructor(page: Page) {
   super(page);
  }

  async goToPage() {
   

    await this.click(LoginPageLocators.txtSearch);

    //await this.enter(LoginPageLocators.loginlink,"hello");
    //await this.click(LoginPageLocators.loginlink);

     }

  async loginUsername() {

    await this.click(LoginPageLocators.btngetstarted,true);
    // const myEle = LoginPageLocators.btngetstarted.locator as
    //   | "alert"
    //   | "alertdialog"
    //   | "application"
    //   | "article"
    //   | "banner"
    //   | "blockquote"
    //   | "button"
    //   | "caption"
    //   | "cell"
    //   | "checkbox"
    //   | "code"
    //   | "columnheader"
    //   | "combobox"
    //   | "complementary"
    //   | "contentinfo"
    //   | "definition"
    //   | "deletion"
    //   | "dialog"
    //   | "directory"
    //   | "document"
    //   | "emphasis"
    //   | "feed"
    //   | "figure"
    //   | "form"
    //   | "generic"
    //   | "grid"
    //   | "gridcell"
    //   | "group"
    //   | "heading"
    //   | "img"
    //   | "insertion"
    //   | "link"
    //   | "list"
    //   | "listbox"
    //   | "listitem"
    //   | "log"
    //   | "main"
    //   | "marquee"
    //   | "math"
    //   | "meter"
    //   | "menu"
    //   | "menubar"
    //   | "menuitem"
    //   | "menuitemcheckbox"
    //   | "menuitemradio"
    //   | "navigation"
    //   | "none"
    //   | "note"
    //   | "option"
    //   | "paragraph"
    //   | "presentation"
    //   | "progressbar"
    //   | "radio"
    //   | "radiogroup"
    //   | "region"
    //   | "row"
    //   | "rowgroup"
    //   | "rowheader"
    //   | "scrollbar"
    //   | "search"
    //   | "searchbox"
    //   | "separator"
    //   | "slider"
    //   | "spinbutton"
    //   | "status"
    //   | "strong"
    //   | "subscript"
    //   | "superscript"
    //   | "switch"
    //   | "tab"
    //   | "table"
    //   | "tablist"
    //   | "tabpanel"
    //   | "term"
    //   | "textbox"
    //   | "time"
    //   | "timer"
    //   | "toolbar"
    //   | "tooltip"
    //   | "tree"
    //   | "treegrid"
    //   | "treeitem";

    // await this.page
    //   .getByRole(myEle, LoginPageLocators.btngetstarted.actionOptions)
    //   .click(); // await page.getByRole('img', { name: 'Browsers (Chromium, Firefox,' }).click();

    //  await page.getByRole('img', { name: 'Browsers (Chromium, Firefox,' }).click();
    //await page.getByText('Cross-browser.').click();
    //await page.locator('[id="__docusaurus_skipToContent_fallback"] div').filter({ hasText: 'Cross-browser. Playwright' }).nth(3).click();
    //await page.getByRole('link', { name: 'Java', exact: true }).click();

    // await this.page.getByRole('link', { name: 'Get started' }).click();
  }
}
