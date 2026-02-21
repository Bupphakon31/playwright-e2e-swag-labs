import { test, expect } from "@playwright/test";
import { ENV } from "globalVariables";
import { onFileExtensionUtil } from "@support/utils/fileExtensionUtil";
import { LoginPage, ProductPage, CommonFunctions, CartPage, CheckoutPage } from "@index";

test.describe("End-to-end for the Sauce Demo website", async () => {
    let onLoginPage: LoginPage;
    let onProductPage: ProductPage;
    let onCommonFunctions: CommonFunctions;
    let onCartPage: CartPage;
    let onCheckoutPage: CheckoutPage;
    let dataTestCommon: Record<string, any> = {};
    let dataTestCheckout: Record<string, any> = {};
    let expectedResultLogin: Record<string, any> = {};
    let expectedResultProduct: Record<string, any> = {};
    let expectedResultCart: Record<string, any> = {};
    let expectedResultCheckout: Record<string, any> = {};
    let expectedCommon: Record<string, any> = {};

    test.beforeAll(async () => {
        dataTestCommon = await onFileExtensionUtil.readDataFromJson(`./resources/dataTest/commonData.json`);
        dataTestCheckout = await onFileExtensionUtil.readDataFromJson(`./resources/dataTest/checkoutPage.json`);

        expectedCommon = await onFileExtensionUtil.readDataFromJson(`./resources/expectedResults/common.json`);
        expectedResultLogin = await onFileExtensionUtil.readDataFromJson(`./resources/expectedResults/loginPage.json`);
        expectedResultProduct = await onFileExtensionUtil.readDataFromJson(
            `./resources/expectedResults/productPage.json`
        );
        expectedResultCart = await onFileExtensionUtil.readDataFromJson(`./resources/expectedResults/cartPage.json`);
        expectedResultCheckout = await onFileExtensionUtil.readDataFromJson(
            `./resources/expectedResults/checkoutPage.json`
        );
    });

    test(
        "Verify user able to Place an Order Successfully",
        { tag: ["@high", "@regression", "@ui"] },
        async ({ page }) => {
            onLoginPage = new LoginPage(page);
            onProductPage = new ProductPage(page);
            onCommonFunctions = new CommonFunctions(page);
            onCartPage = new CartPage(page);
            onCheckoutPage = new CheckoutPage(page);

            await page.goto(String(ENV.ENV_BASE_URL));
            await onLoginPage.verifyLoginPage(expectedResultLogin);
            await onLoginPage.fillUsernameAndPassword(String(ENV.VALID_USERNAME), String(ENV.VALID_PASSWORD));
            await onLoginPage.clickLoginButton();
            await expect(page).toHaveURL(String(ENV.ENV_BASE_URL) + ENV.PRODUCT_PATH);

            await onProductPage.verifyProductPage(expectedResultProduct);
            await onProductPage.clickAddItemToCartButton([dataTestCommon.itemName[0], dataTestCommon.itemName[1]]);

            await onCommonFunctions.clickShoppingCartButton();
            await expect(page).toHaveURL(String(ENV.ENV_BASE_URL) + ENV.CART_PATH);

            await onCartPage.verifyCartPage(expectedResultCart);
            await onCartPage.verifyCheckoutItems([dataTestCommon.itemName[0], dataTestCommon.itemName[1]]);
            await onCartPage.clickCheckoutButton();

            await expect(page).toHaveURL(String(ENV.ENV_BASE_URL) + ENV.CHECKOUT_STEP_ONE_PATH);
            await onCheckoutPage.verifyCheckoutInformationPage(expectedResultCheckout);
            await onCheckoutPage.fillCheckoutInformation(
                dataTestCheckout.firstName,
                dataTestCheckout.lastName,
                dataTestCheckout.postalCode
            );
            await onCheckoutPage.clickContinueButton();

            await expect(page).toHaveURL(String(ENV.ENV_BASE_URL) + ENV.CHECKOUT_STEP_TWO_PATH);
            await onCheckoutPage.verifyCheckoutOverviewPage(expectedResultCheckout);
            await onCheckoutPage.clickFinishButton();

            await expect(page).toHaveURL(String(ENV.ENV_BASE_URL) + ENV.CHECKOUT_COMPLETE_PATH);
            await onCheckoutPage.verifyOrderCompletePage(expectedResultCheckout);
            await onCommonFunctions.clickHamburgerButton();
            await onCommonFunctions.verifyHamburgerMenuOptions(expectedCommon.hamburgerMenuOptions);
            await onCommonFunctions.clickLogoutButton();
            await expect(page).toHaveURL(String(ENV.ENV_BASE_URL));
            await onLoginPage.verifyLoginPage(expectedResultLogin);
        }
    );
});
