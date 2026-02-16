import { type Page } from "@playwright/test";

export class ProductPageLocators {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    get shoppingCartBadge() {
        return this.page.getByTestId("shopping-cart-badge");
    }
    get removeButton() {
        return this.page.getByText("Remove");
    }
    get inventoryContainer() {
        return this.page.getByTestId("inventory-container");
    }
    get addItemButton() {
        return this.page.locator(".inventory_item_description button");
    }
    get itemsContainer() {
        return this.page.getByTestId("inventory-item");
    }
}
