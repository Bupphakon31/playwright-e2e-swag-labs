import { type Page } from "@playwright/test";

export class CheckoutPageLocators {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    get firstNameField() {
        return this.page.getByTestId("firstName");
    }
    get lastNameField() {
        return this.page.getByTestId("lastName");
    }
    get postalCodeField() {
        return this.page.getByTestId("postalCode");
    }
    get continueButton() {
        return this.page.getByTestId("continue");
    }
    get cancelButton() {
        return this.page.getByTestId("cancel");
    }
    get qtyLabel() {
        return this.page.getByTestId("cart-quantity-label");
    }
    get descriptionLabel() {
        return this.page.getByTestId("cart-desc-label");
    }
    get itemsContainer() {
        return this.page.getByTestId("inventory-item");
    }
    get itemPrice() {
        return this.page.getByTestId("inventory-item-price");
    }
    get paymentInfoLabel() {
        return this.page.getByTestId("payment-info-label");
    }
    get paymentInfoValue() {
        return this.page.getByTestId("payment-info-value");
    }
    get shippingInfoLabel() {
        return this.page.getByTestId("shipping-info-label");
    }
    get shippingInfoValue() {
        return this.page.getByTestId("shipping-info-value");
    }
    get priceTotalLabel() {
        return this.page.getByTestId("total-info-label");
    }
    get priceTotalValue() {
        return this.page.getByTestId("subtotal-label");
    }
    get taxValue() {
        return this.page.getByTestId("tax-label");
    }
    get totalValue() {
        return this.page.getByTestId("total-label");
    }
    get finishButton() {
        return this.page.getByTestId("finish");
    }
    get checkedIcon() {
        return this.page.getByTestId("pony-express");
    }
    get checkoutCompleteHeader() {
        return this.page.getByTestId("complete-header");
    }
    get checkoutCompleteText() {
        return this.page.getByTestId("complete-text");
    }
    get backHomeButton() {
        return this.page.getByTestId("back-to-products");
    }
}
