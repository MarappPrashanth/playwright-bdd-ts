import { ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import basePage from "./basePage";
import { Page } from "playwright";


export default class homePage extends basePage {
 
    constructor(page: Page,log:ICreateLog) {
     super(page,log);
    }
}