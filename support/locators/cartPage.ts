import { type Page } from "@playwright/test";

export class CartPageLocators {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    get continueShoppingButton() {
        return this.page.getByTestId("continue-shopping");
    }
    get checkoutButton() {
        return this.page.getByTestId("checkout");
    }

    get qtyLabel() {
        return this.page.getByTestId("cart-quantity-label");
    }
    get descriptionLabel() {
        return this.page.getByTestId("cart-desc-label");
    }
}
