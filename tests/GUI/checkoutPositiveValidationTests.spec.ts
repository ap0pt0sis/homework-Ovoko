import { test, expect } from "@playwright/test";
import { navigateToBaseUrlAndHandleCookies } from "../utils/navigation";
// import { LoginPage } from "../pages/LoginPage";
// import { DashboardPage } from "../pages/DashboardPage";
// import { testData } from "../testData/test-data";

test.beforeEach(async ({ page }) => {
  await navigateToBaseUrlAndHandleCookies(page);
});

test("FillInShipToInformation", async ({ page }) => {
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
  await page2.waitForLoadState('load');
  await page2.getByRole("button", { name: "Go to checkout" }).click();
  await page2.getByRole("button", { name: "Continue as guest" }).click();
  await page2.getByRole('textbox', { name: 'First name' }).fill('dflkdlfkdl');
  await page2.getByRole('textbox', { name: 'Last name' }).fill('kldfkdlfkdf');
  await page2.getByRole('textbox', { name: 'Street address', exact: true }).fill('dfkldkfldkf');
  await page2.getByRole('textbox', { name: 'Street address 2 (optional)' }).fill('kdlfkdlfkdlfk');
  await page2.getByRole('textbox', { name: 'City' }).fill('dkfldkfldkf');
  await page2.getByRole('textbox', { name: 'State/Province/Region' }).fill('dkfdlfkdlkf');
  await page2.getByRole('textbox', { name: 'ZIP code' }).fill('djkfdjfk');
  await page2.getByRole('textbox', { name: 'Email', exact: true }).fill('kdlfdkflkdf@gmail.com');
  await page2.getByRole('textbox', { name: 'Confirm email' }).fill('kdlfdkflkdf@gmail.com');
  await page2.getByRole('textbox', { name: 'Phone number (required)' }).fill('65665565');
  await page2.locator('[data-test-id="ADD_ADDRESS_SUBMIT"]').click();

  await expect(page2.locator('div').filter({ hasText: /^dflkdlfkdl kldfkdlfkdf$/ })).toBeVisible();
  await expect(page2.getByText('dfkldkfldkf, kdlfkdlfkdlfk')).toBeVisible();
  await expect(page2.getByText('dkfldkfldkf, dkfdlfkdlkf')).toBeVisible();
  await expect(page2.getByText('kdlfdkflkdf@gmail.com')).toBeVisible();
  await expect(page2.getByText('065665565')).toBeVisible();
});