import { Page, Locator } from "@playwright/test";

export default class Loginpage {
  readonly page: Page;
  readonly loginEmailInput: Locator;
  readonly continueButton: Locator;
  readonly loginPasswordInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginEmailInput = page.getByRole("textbox", { name: "Email address" });
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.loginPasswordInput = page.getByRole("textbox", { name: "Password" });
  }

  async newLogin(email: string, password: string) {
    await this.loginEmailInput.fill(email);
    await this.continueButton.click();
    await this.loginPasswordInput.fill(password);
    await this.continueButton.click();
  }
}
