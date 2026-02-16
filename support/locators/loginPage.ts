import { type Page } from "@playwright/test";

export class LoginPageLocators {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    get loginHeader() {
        return this.page.getByText("Swag Labs");
    }
    get usernameField() {
        return this.page.getByTestId("username");
    }
    get passwordField() {
        return this.page.getByTestId("password");
    }
    get loginButton() {
        return this.page.getByTestId("login-button");
    }
    get loginContainer() {
        return this.page.getByTestId("login-credentials-container");
    }
}
