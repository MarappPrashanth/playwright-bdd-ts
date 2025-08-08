import { Page } from "playwright";
import * as LoginPageLocators from "../locators/loginPageLocators.json";
import basePage from "./basePage";

export default class loginPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async goToPage() {
    await this.click((LoginPageLocators as any).btngetstarted);
  }

  async loginUsername() {
    await this.click((LoginPageLocators as any).txtSearch);
  }
}
