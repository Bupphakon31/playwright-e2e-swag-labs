import { type Page } from "@playwright/test";

export class CommonLocators {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    get pageTitle() {
        return this.page.getByTestId("title");
    }
    get shoppingCartButton() {
        return this.page.getByTestId("shopping-cart-link");
    }
    get footer() {
        return this.page.getByTestId("footer");
    }
    get itemNames() {
        return this.page.getByTestId("inventory-item-name");
    }
    get itemPrices() {
        return this.page.getByTestId("inventory-item-price");
    }
    get itemDesc() {
        return this.page.getByTestId("inventory-item-desc");
    }
    get hamburgerButton() {
        return this.page.getByTestId("open-menu");
    }
    get allItemButton() {
        return this.page.getByTestId("inventory-sidebar-link");
    }
    get aboutButton() {
        return this.page.getByTestId("about-sidebar-link");
    }
    get logoutButton() {
        return this.page.getByTestId("logout-sidebar-link");
    }
    get resetAppStateButton() {
        return this.page.getByTestId("reset-sidebar-link");
    }
    get closeHamburgerButton() {
        return this.page.getByTestId("close-menu");
    }
}
