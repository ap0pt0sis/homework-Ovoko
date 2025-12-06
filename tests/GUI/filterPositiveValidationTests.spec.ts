import { test, expect } from "@playwright/test";
import { navigateToBaseUrlAndHandleCookies } from "../utils/navigation";
import { SearchPage } from "../pages/searchPage";
import { testData } from "../testData/test-data";

test.beforeEach(async ({ page }) => {
  await navigateToBaseUrlAndHandleCookies(page);
});

test("FilterProductByBrand", async ({ page }) => {
  // Arrange
  const searchPage = new SearchPage(page);
  await searchPage.search(testData.headphones);
  await page.waitForTimeout(2000); // bad practice, I know :(

  // Act
  await page.getByLabel("Sony", { exact: true }).check();

  // Assert
  await expect(
    page.getByRole("link", { name: "Sony Remove filter" })
  ).toBeVisible();
});

test("FilterProductByPriceRange", async ({ page }) => {
  // Arrange
  const searchPage = new SearchPage(page);
  await searchPage.search(testData.headphones);
  await page.waitForTimeout(2000); // bad practice, I know :(
  
  // Act
  await searchPage.filterByPriceRange("50", "200");

  // Assert
  await expect(
    page.getByRole("link", { name: "$50.00 to $200.00 Remove" })
  ).toBeVisible();
});
