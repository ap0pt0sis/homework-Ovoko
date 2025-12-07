import { test, expect } from "@playwright/test";
import { navigateToBaseUrlAndHandleCookies } from "../utils/navigation";
import { SearchPage } from "../pages/searchPage";
import { testData } from "../testData/test-data";

test.beforeEach(async ({ page }) => {
  await navigateToBaseUrlAndHandleCookies(page);
});

test("Filter Product By Invalid Price Range", async ({ page }) => {
  // Arrange
  const searchPage = new SearchPage(page);
  await searchPage.search(testData.headphones);
  await page.waitForTimeout(3000); // bad practice, I know :(
  
  // Act
  await searchPage.filterByPriceRangeWithoutSubmit("-1", "-1");

  // Assert
  await expect(page.getByText('Please provide a valid price')).toBeVisible();
});
