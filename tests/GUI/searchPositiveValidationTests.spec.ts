import { test, expect } from "@playwright/test";
import { navigateToBaseUrlAndHandleCookies } from "../utils/navigation";
import { SearchPage } from "../pages/searchPage";
import { testData } from "../testData/test-data";

test.beforeEach(async ({ page }) => {
  await navigateToBaseUrlAndHandleCookies(page);
});

test("Search Item", async ({ page }) => {
  // Arrange
  const searchPage = new SearchPage(page);
  const searchTerm = testData.headphones;

  // Act
  await searchPage.search(searchTerm);

  // Assert
  await expect(searchPage.searchInput).toHaveValue(searchTerm);
});
