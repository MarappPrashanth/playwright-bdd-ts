import { Given, When, Then } from "@cucumber/cucumber";
import { test, expect } from "@playwright/test";
import { getPage } from "../../corelib/corelib.spec";
import LoginPage from "../pages/loginPage";

let loginPage: LoginPage;

Given("I have a precondition", async function () {
  loginPage = new LoginPage(getPage());
  await loginPage.goToPage();
  //expect
  console.log("I have a precondition");
});

When("I perform an action", async function () {
  loginPage = new LoginPage(getPage());
  await loginPage.loginUsername();
  console.log("I perform an action");
});

Then("I should see the expected outcome", async function () {
  console.log("I should see the expected outcome");
});
