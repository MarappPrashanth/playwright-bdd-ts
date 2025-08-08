"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const LoginPageLocators = tslib_1.__importStar(require("../locators/loginPageLocators.json"));
const basePage_1 = tslib_1.__importDefault(require("./basePage"));
class loginPage extends basePage_1.default {
    constructor(page) {
        super(page);
    }
    async goToPage() {
        await this.click(LoginPageLocators.btngetstarted);
    }
    async loginUsername() {
        await this.click(LoginPageLocators.txtSearch);
    }
}
exports.default = loginPage;
