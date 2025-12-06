import { Page, Locator } from "@playwright/test";

export class SearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResultLink: Locator;
  readonly minPriceInput: Locator;
  readonly maxPriceInput: Locator;
  readonly submitPriceRangeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole("combobox", { name: "Search for anything" });
    this.searchButton = page.getByRole("button", { name: "Search", exact: true });
    this.searchResultLink = page.locator("a[class='s-card__link'][href^='https://www.ebay.com/itm']");
    this.minPriceInput = page.getByRole("textbox", { name: "Minimum Value in $" });
    this.maxPriceInput = page.getByRole("textbox", { name: "Maximum Value in $" });
    this.submitPriceRangeButton = page.getByRole("button", { name: "Submit price range" });
  }

  async search(searchTerm: string): Promise<void> {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
  }

  async clickSearchResult(index: number = 0): Promise<void> {
    await this.searchResultLink.nth(index).click();
  }

  async filterByPriceRange(min: string, max: string): Promise<void> {
    await this.minPriceInput.fill(min);
    await this.maxPriceInput.fill(max);
    await this.submitPriceRangeButton.click();
  }
}
