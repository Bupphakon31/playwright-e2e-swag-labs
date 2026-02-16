import { type Page, expect } from "@playwright/test";
import { LoginPageLocators } from "@support/locators/loginPage";
import { step } from "@index";

export class LoginPage {
    readonly locators: LoginPageLocators;

    constructor(page: Page) {
        this.locators = new LoginPageLocators(page);
    }

    @step("Fill username and password field")
    async fillUsernameAndPassword(username: string, password: string) {
        await this.locators.usernameField.fill(username);
        await this.locators.passwordField.fill(password);
        await expect(this.locators.usernameField).toHaveValue(username);
        await expect(this.locators.passwordField).toHaveValue(password);
    }

    @step("Click login button")
    async clickLoginButton() {
        await this.locators.loginButton.click();
    }

    @step("Verify login page")
    async verifyLoginPage(expected: Record<string, any>) {
        await Promise.all([
            expect(this.locators.loginHeader).toBeVisible(),
            expect(this.locators.loginContainer).toBeVisible(),
            expect(this.locators.usernameField).toBeVisible(),
            expect(this.locators.passwordField).toBeVisible(),
            expect(this.locators.loginButton).toBeVisible(),
            expect(this.locators.loginHeader).toHaveText(expected.title),
            expect(this.locators.loginButton).toHaveValue(expected.txtLoginButton),
        ]);
    }
}
