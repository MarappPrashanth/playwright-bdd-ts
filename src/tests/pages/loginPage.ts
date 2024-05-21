import { Page } from "playwright";
import * as LoginPageLocators from "../locators/loginPageLocators.json";
import basePage from "./basePage";
import { ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";

export default class loginPage extends basePage {
  constructor(page: Page,log:ICreateLog) {
    super(page,log);
  }

  async goToPage() {
   // 
   await this.click(LoginPageLocators.btngetstarted, true);
    //await this.enter(LoginPageLocators.loginlink,"hello");
    //await this.click(LoginPageLocators.loginlink);
  }

  async loginUsername() {
    
    await this.click(LoginPageLocators.txtSearch);
  }
}
