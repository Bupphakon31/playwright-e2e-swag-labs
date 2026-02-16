import { type Page, expect } from "@playwright/test";
import { CommonLocators } from "@support/locators/common";
import { step } from "@index";

export interface ItemNameList {
    itemName: Array<
        | "Sauce Labs Backpack"
        | "Sauce Labs Bike Light"
        | "Sauce Labs Bolt T-Shirt"
        | "Sauce Labs Fleece Jacket"
        | "Sauce Labs Onesie"
        | "Test.allTheThings() T-Shirt (Red)"
    >;
}

export class CommonFunctions {
    readonly locators: CommonLocators;

    constructor(page: Page) {
        this.locators = new CommonLocators(page);
    }

    @step("Click shopping cart button")
    async clickShoppingCartButton() {
        await this.locators.shoppingCartButton.click();
    }

    @step("Click hamburger button")
    async clickHamburgerButton() {
        await this.locators.hamburgerButton.click({ force: true });
    }

    @step("Verify hamburger menu options")
    async verifyHamburgerMenuOptions(expected: Record<string, any>) {
        await Promise.all([
            expect(this.locators.allItemButton).toBeVisible(),
            expect(this.locators.aboutButton).toBeVisible(),
            expect(this.locators.logoutButton).toBeVisible(),
            expect(this.locators.resetAppStateButton).toBeVisible(),
            expect(this.locators.closeHamburgerButton).toBeVisible(),
            expect(this.locators.allItemButton).toHaveText(expected.allItems),
            expect(this.locators.aboutButton).toHaveText(expected.about),
            expect(this.locators.logoutButton).toHaveText(expected.logout),
            expect(this.locators.resetAppStateButton).toHaveText(expected.resetAppState),
        ]);
    }

    @step("Click logout button")
    async clickLogoutButton() {
        await this.locators.logoutButton.click();
    }
}
