import { test, expect } from "@playwright/test";
import { navigateToBaseUrlAndHandleCookies } from "../utils/navigation";
// import { LoginPage } from "../pages/LoginPage";
// import { DashboardPage } from "../pages/DashboardPage";
// import { testData } from "../testData/test-data";

test.beforeEach(async ({ page }) => {
  await navigateToBaseUrlAndHandleCookies(page);
});

test("AddProductToTheCard", async ({ page }) => {
  await page
    .getByRole("combobox", { name: "Search for anything" })
    .fill("Sony - WH-CH720N Wireless Noise Canceling Headphones - Blue");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await page
    .locator("a[class='s-card__link'][href^='https://www.ebay.com/itm']")
    .nth(2)
    .click();

  const page2Promise = page.waitForEvent("popup");
  const page2 = await page2Promise;
  await page2
    .getByTestId("x-atc-action")
    .getByTestId("ux-call-to-action")
    .click();

  // const colorPrompt = page.getByText("Please select a Color");
  // if (await colorPrompt.isVisible()) {
  //   await page.getByRole("option").first().click();
  // }

  await expect(page2.getByText("Added to cart")).toBeVisible();
});

test("RemoveProductFromTheCard", async ({ page }) => {
  await page
    .getByRole("combobox", { name: "Search for anything" })
    .fill("Sony - WH-CH720N Wireless Noise Canceling Headphones - Blue");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await page
    .locator("a[class='s-card__link'][href^='https://www.ebay.com/itm']")
    .first()
    .click();
  const page2Promise = page.waitForEvent("popup");
  const page2 = await page2Promise;
  await page2
    .getByTestId("x-atc-action")
    .getByTestId("ux-call-to-action")
    .click();

  await page2.getByRole("link", { name: "See in cart" }).click();
  await page2.locator('[data-test-id="cart-remove-item"]').click();

  await expect(page2.getByText("You don't have any items in")).toBeVisible();
});

test("ReturnToCardFromCheckout", async ({ page }) => {
  await page
    .getByRole("combobox", { name: "Search for anything" })
    .fill("Sony - WH-CH720N Wireless Noise Canceling Headphones - Blue");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await page
    .locator("a[class='s-card__link'][href^='https://www.ebay.com/itm']")
    .nth(0)
    .click();
  const page2Promise = page.waitForEvent("popup");
  const page2 = await page2Promise;
  await page2
    .getByTestId("x-atc-action")
    .getByTestId("ux-call-to-action")
    .click();

  await page2.getByRole("link", { name: "See in cart" }).click();
  await page2.waitForLoadState('load');
  await page2.getByRole("button", { name: "Go to checkout" }).click();
  await page2.getByRole("button", { name: "Continue as guest" }).click();
  await page2.goBack();
  
  await expect(page2.locator('[data-test-id="main-title"]')).toHaveText('Shopping cart');
});
