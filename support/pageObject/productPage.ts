import { type Page, expect } from "@playwright/test";
import { ProductPageLocators } from "@support/locators/productPage";
import { step, ItemNameList } from "@index";
import { CommonLocators } from "@support/locators/common";

export class ProductPage {
    readonly page: Page;
    readonly locators: ProductPageLocators;
    readonly commonLocators: CommonLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new ProductPageLocators(page);
        this.commonLocators = new CommonLocators(page);
    }

    @step("Verify product page")
    async verifyProductPage(expected: Record<string, any>) {
        await Promise.all([
            expect(this.commonLocators.pageTitle).toHaveText(expected.title),
            expect(this.locators.inventoryContainer).toBeVisible(),
            expect(this.locators.itemsContainer).toHaveCount(6),
            expect(this.commonLocators.footer).toBeVisible(),
        ]);
    }

    @step("Verify items is added to cart")
    async verifyItemsAddedToCart(numberOfAddedItems: number) {
        await expect(this.locators.shoppingCartBadge).toBeVisible();
        await expect(this.locators.shoppingCartBadge).toHaveText(String(numberOfAddedItems));
    }

    @step("Click add item to cart button")
    async clickAddItemToCartButton(itemName: ItemNameList["itemName"]) {
        if (!itemName || itemName.length === 0) {
            throw new Error("Item name is required");
        }
        let addedItem = 0;
        const totalItem = 6; // Total number of items available on the product page
        for (let i = 0; i < itemName.length; i++) {
            for (let t = 0; t < totalItem; t++) {
                const itemNamelists = await this.commonLocators.itemNames.nth(t).innerText();
                if (itemNamelists === itemName[i]) {
                    await this.locators.addItemButton.nth(t).click();
                    addedItem += 1;
                    await this.verifyItemsAddedToCart(addedItem);
                    break;
                }
            }
        }
    }
}
