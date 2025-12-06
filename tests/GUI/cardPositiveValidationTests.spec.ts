import { test, expect } from "@playwright/test";
import { navigateToBaseUrlAndHandleCookies } from "../utils/navigation";
import { SearchPage } from "../pages/searchPage";
import { ProductPage } from "../pages/productPage";
import { CartPage } from "../pages/cartPage";
import { testData } from "../testData/test-data";

test.beforeEach(async ({ page }) => {
  await navigateToBaseUrlAndHandleCookies(page);
});

test("Add Product to Card", async ({ page }) => {
  // Arrange
  const searchPage = new SearchPage(page);
  await searchPage.search(testData.sonyHeadphones);
  await searchPage.clickSearchResult(2);

  // Act
  const page2Promise = page.waitForEvent("popup");
  const page2 = await page2Promise;
  const productPage = new ProductPage(page2);
  await productPage.addToCart();

  // Assert
  await expect(page2.getByText("Added to cart")).toBeVisible();
});

test("Remove Product from Card", async ({ page }) => {
  // Arrange
  const searchPage = new SearchPage(page);
  await searchPage.search(testData.sonyHeadphones);
  await searchPage.clickSearchResult();
  const page2Promise = page.waitForEvent("popup");
  const page2 = await page2Promise;
  const productPage = new ProductPage(page2);
  await productPage.addToCart();

  // Act
  await productPage.seeInCart();
  const cartPage = new CartPage(page2);
  await cartPage.removeItem();

  // Assert
  await expect(page2.getByText("You don't have any items in")).toBeVisible();
});

test("Return to Card from Checkout", async ({ page }) => {
  // Arrange
  const searchPage = new SearchPage(page);
  await searchPage.search(testData.sonyHeadphones);
  await searchPage.clickSearchResult(0);
  const page2Promise = page.waitForEvent("popup");
  const page2 = await page2Promise;
  const productPage = new ProductPage(page2);
  await productPage.addToCart();
  
  // Act
  await productPage.seeInCart();
  await page2.waitForLoadState('load');
  const cartPage = new CartPage(page2);
  await cartPage.goToCheckoutAsGuest();
  await page2.goBack();
  
  // Assert
  await expect(cartPage.mainTitle).toHaveText('Shopping cart');
});
