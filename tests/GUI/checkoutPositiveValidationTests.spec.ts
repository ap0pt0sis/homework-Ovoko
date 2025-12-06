import { test, expect } from "@playwright/test";
import { navigateToBaseUrlAndHandleCookies } from "../utils/navigation";
import { SearchPage } from "../pages/searchPage";
import { ProductPage } from "../pages/productPage";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { generateRandomString, generateRandomEmail, generateRandomPhone } from "../utils/helpers";
import { testData } from "../testData/test-data";

test.beforeEach(async ({ page }) => {
  await navigateToBaseUrlAndHandleCookies(page);
});

test("Fill In Ship to Information", async ({ page }) => {
  // Arrange
  const searchPage = new SearchPage(page);
  await searchPage.search(testData.sonyHeadphones);
  await searchPage.clickSearchResult();
  const page2Promise = page.waitForEvent("popup");
  const page2 = await page2Promise;
  const productPage = new ProductPage(page2);
  await productPage.addToCart();
  await productPage.seeInCart();
  await page2.waitForLoadState('load');
  const cartPage = new CartPage(page2);
  await cartPage.goToCheckoutAsGuest();
  
  // Act
  const checkoutPage = new CheckoutPage(page2);
  const email = generateRandomEmail(12);
  const shippingInfo = {
    firstName: generateRandomString(10),
    lastName: generateRandomString(10),
    streetAddress: generateRandomString(10),
    streetAddress2: generateRandomString(12),
    city: generateRandomString(10),
    state: generateRandomString(10),
    zipCode: generateRandomString(8),
    email: email,
    confirmEmail: email,
    phoneNumber: generateRandomPhone()
  };
  await checkoutPage.fillShippingInfo(shippingInfo);
  
  // Assert
  await checkoutPage.verifyShippingInfo(shippingInfo);
});
