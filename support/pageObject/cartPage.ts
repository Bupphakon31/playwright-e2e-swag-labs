import { type Page, expect } from "@playwright/test";
import { CommonLocators } from "@support/locators/common";
import { CartPageLocators } from "@support/locators/cartPage";
import { step, ItemNameList } from "@index";

export class CartPage {
    readonly page: Page;
    readonly locators: CartPageLocators;
    readonly commonLocators: CommonLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new CartPageLocators(page);
        this.commonLocators = new CommonLocators(page);
    }

    @step("Verify cart page")
    async verifyCartPage(expected: Record<string, any>) {
        await Promise.all([
            expect(this.commonLocators.pageTitle).toBeVisible(),
            expect(this.locators.qtyLabel).toBeVisible(),
            expect(this.locators.descriptionLabel).toBeVisible(),
            expect(this.locators.checkoutButton).toBeVisible(),
            expect(this.locators.continueShoppingButton).toBeVisible(),
            expect(this.commonLocators.pageTitle).toHaveText(expected.title),
            expect(this.locators.qtyLabel).toHaveText(expected.qtyLabel),
            expect(this.locators.descriptionLabel).toHaveText(expected.descriptionLabel),
            expect(this.locators.checkoutButton).toHaveText(expected.checkoutButton),
            expect(this.locators.continueShoppingButton).toHaveText(expected.continueShoppingButton),
        ]);
    }

    @step("Click checkout button")
    async clickCheckoutButton() {
        await this.locators.checkoutButton.click();
    }

    @step("Verify checkout items")
    async verifyCheckoutItems(itemName: ItemNameList["itemName"]) {
        if (!itemName || itemName.length === 0) {
            throw new Error("Item name is required");
        }
        for (let i = 0; i < itemName.length; i++) {
            const itemInCart = await this.commonLocators.itemNames.nth(i).innerText();
            expect(itemInCart).toEqual(itemName[i]);
        }
    }
}
