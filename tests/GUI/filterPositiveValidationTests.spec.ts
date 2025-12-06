import { test, expect } from "@playwright/test";
import { navigateToBaseUrlAndHandleCookies } from "../utils/navigation";
// import { LoginPage } from "../pages/LoginPage";
// import { DashboardPage } from "../pages/DashboardPage";
// import { testData } from "../testData/test-data";

test.beforeEach(async ({ page }) => {
  await navigateToBaseUrlAndHandleCookies(page);
});

test("FilterProductByBrand", async ({ page }) => {
  await page
    .getByRole("combobox", { name: "Search for anything" })
    .fill("headphones");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  //await page.getByRole('button', { name: 'More options', exact: true }).first().click();
  await page.waitForTimeout(1000); // bad practice, I know :(

  await page.getByLabel("Sony", { exact: true }).check();

  await expect(
    page.getByRole("link", { name: "Sony Remove filter" })
  ).toBeVisible();
});

test("FilterProductByPriceRange", async ({ page }) => {
  await page
    .getByRole("combobox", { name: "Search for anything" })
    .fill("headphones");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await page.waitForTimeout(1000); // wait 1 seconds
  const minInput = page.getByRole("textbox", { name: "Minimum Value in $" });
  const maxInput = page.getByRole("textbox", { name: "Maximum Value in $" });
  const submitButton = page.getByRole("button", { name: "Submit price range" });
  await minInput.fill("50");
  await maxInput.fill("200");
  await submitButton.click();

  await expect(
    page.getByRole("link", { name: "$50.00 to $200.00 Remove" })
  ).toBeVisible();
});
