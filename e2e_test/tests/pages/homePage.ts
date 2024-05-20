import basePage from "../pages/basePage";
import { Page } from "playwright";


export default class homePage extends basePage {
 
    constructor(page: Page) {
     super(page);
    }
}