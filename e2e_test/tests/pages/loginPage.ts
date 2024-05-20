import { Page } from "playwright";

export default class loginPage {
    
page:Page;
    constructor(page:Page) {
    this.page=page;
    }

    
    async  goToPage() {
        await this.page.goto('https://playwright.dev/');
    }

    async  loginUsername() {

        await this.page.getByRole('link', { name: 'Get started' }).click();
    }
}