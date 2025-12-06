import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly removeItemButton: Locator;
  readonly goToCheckoutButton: Locator;
  readonly continueAsGuestButton: Locator;
  readonly mainTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.removeItemButton = page.locator('[data-test-id="cart-remove-item"]');
    this.goToCheckoutButton = page.getByRole("button", { name: "Go to checkout" });
    this.continueAsGuestButton = page.getByRole("button", { name: "Continue as guest" });
    this.mainTitle = page.locator('[data-test-id="main-title"]');
  }

  async removeItem(): Promise<void> {
    await this.removeItemButton.click();
  }

  async goToCheckoutAsGuest(): Promise<void> {
    await this.goToCheckoutButton.click();
    await this.continueAsGuestButton.click();
  }
}
