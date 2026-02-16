import { type Page, expect } from "@playwright/test";
import { CommonLocators } from "@support/locators/common";
import { CheckoutPageLocators } from "@support/locators/checkoutPage";
import { step, ItemNameList } from "@index";

export class CheckoutPage {
    readonly page: Page;
    readonly commonLocators: CommonLocators;
    readonly checkoutPageLocators: CheckoutPageLocators;
    constructor(page: Page) {
        this.page = page;
        this.commonLocators = new CommonLocators(page);
        this.checkoutPageLocators = new CheckoutPageLocators(page);
    }

    @step("Verify checkout information page")
    async verifyCheckoutInformationPage(expected: Record<string, any>) {
        await Promise.all([
            expect(this.commonLocators.pageTitle).toBeVisible(),
            expect(this.checkoutPageLocators.firstNameField).toBeVisible(),
            expect(this.checkoutPageLocators.lastNameField).toBeVisible(),
            expect(this.checkoutPageLocators.postalCodeField).toBeVisible(),
            expect(this.checkoutPageLocators.continueButton).toBeVisible(),
            expect(this.checkoutPageLocators.cancelButton).toBeVisible(),
            expect(this.commonLocators.pageTitle).toHaveText(expected.checkoutInfoTitle),
            expect(this.checkoutPageLocators.continueButton).toHaveText(expected.continueButton),
            expect(this.checkoutPageLocators.cancelButton).toHaveText(expected.cancelButton),
        ]);
    }

    @step("Fill checkout information")
    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.checkoutPageLocators.firstNameField.fill(firstName);
        await this.checkoutPageLocators.lastNameField.fill(lastName);
        await this.checkoutPageLocators.postalCodeField.fill(postalCode);
        await expect(this.checkoutPageLocators.firstNameField).toHaveValue(firstName);
        await expect(this.checkoutPageLocators.lastNameField).toHaveValue(lastName);
        await expect(this.checkoutPageLocators.postalCodeField).toHaveValue(postalCode);
    }

    @step("Click continue button")
    async clickContinueButton() {
        await this.checkoutPageLocators.continueButton.click();
    }

    @step("Click finish button")
    async clickFinishButton() {
        await this.checkoutPageLocators.finishButton.click();
    }

    @step("Verify checkout overview page")
    async verifyCheckoutOverviewPage(expected: Record<string, any>) {
        await Promise.all([
            expect(this.commonLocators.pageTitle).toBeVisible(),
            expect(this.checkoutPageLocators.qtyLabel).toBeVisible(),
            expect(this.checkoutPageLocators.descriptionLabel).toBeVisible(),
            expect(this.checkoutPageLocators.paymentInfoLabel).toBeVisible(),
            expect(this.checkoutPageLocators.paymentInfoValue).toBeVisible(),
            expect(this.checkoutPageLocators.shippingInfoLabel).toBeVisible(),
            expect(this.checkoutPageLocators.shippingInfoValue).toBeVisible(),
            expect(this.checkoutPageLocators.priceTotalLabel).toBeVisible(),
            expect(this.checkoutPageLocators.priceTotalValue).toBeVisible(),
            expect(this.checkoutPageLocators.taxValue).toBeVisible(),
            expect(this.checkoutPageLocators.totalValue).toBeVisible(),
            expect(this.checkoutPageLocators.finishButton).toBeVisible(),
            expect(this.commonLocators.pageTitle).toHaveText(expected.checkoutOverviewTitle),
            expect(this.checkoutPageLocators.qtyLabel).toHaveText(expected.qtyLabel),
            expect(this.checkoutPageLocators.descriptionLabel).toHaveText(expected.descriptionLabel),
            expect(this.checkoutPageLocators.paymentInfoLabel).toHaveText(expected.paymentInfoLabel),
            expect(this.checkoutPageLocators.paymentInfoValue).toHaveText(expected.paymentInfoValue),
            expect(this.checkoutPageLocators.shippingInfoLabel).toHaveText(expected.shippingInfoLabel),
            expect(this.checkoutPageLocators.shippingInfoValue).toHaveText(expected.shippingInfoValue),
            expect(this.checkoutPageLocators.priceTotalLabel).toHaveText(expected.priceTotalLabel),
            expect(this.checkoutPageLocators.finishButton).toHaveText(expected.finishButton),
        ]);

        const itemCount = await this.checkoutPageLocators.itemsContainer.count();
        expect(itemCount).toBeGreaterThan(0);
        const itemPriceElements = await this.checkoutPageLocators.itemPrice.elementHandles();
        expect(itemPriceElements.length).toBe(itemCount);
        const totalPrice = await this.calculateTotalPrice();
        const totalValueText = await this.checkoutPageLocators.totalValue.textContent();
        const totalValue = parseFloat(totalValueText?.replace("Total: $", "") || "0");
        expect(totalPrice).toBe(totalValue);
    }

    @step("Calculate total price")
    private async calculateTotalPrice(): Promise<number> {
        const itemPriceElements = await this.checkoutPageLocators.itemPrice.elementHandles();
        let totalPrice = 0;
        for (const itemPrice of itemPriceElements) {
            const priceText = await itemPrice.textContent();
            if (priceText) {
                totalPrice += parseFloat(priceText.replace("$", ""));
            }
        }
        const taxText = await this.checkoutPageLocators.taxValue.textContent();
        if (taxText) {
            totalPrice += parseFloat(taxText.replace("Tax: $", ""));
        }
        return totalPrice;
    }

    @step("Verify checkout complete page")
    async verifyOrderCompletePage(expected: Record<string, any>) {
        Promise.all([
            expect(this.checkoutPageLocators.checkedIcon).toBeVisible(),
            expect(this.checkoutPageLocators.checkoutCompleteHeader).toBeVisible(),
            expect(this.checkoutPageLocators.checkoutCompleteText).toBeVisible(),
            expect(this.checkoutPageLocators.backHomeButton).toBeVisible(),
            expect(this.commonLocators.pageTitle).toHaveText(expected.checkoutCompleteTitle),
            expect(this.checkoutPageLocators.checkoutCompleteText).toHaveText(expected.completeText),
            expect(this.checkoutPageLocators.checkoutCompleteHeader).toHaveText(expected.completeHeader),
            expect(this.checkoutPageLocators.backHomeButton).toHaveText(expected.backHomeButton),
        ]);
    }
}
