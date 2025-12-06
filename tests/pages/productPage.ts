import { Page, Locator } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly seeInCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page
      .getByTestId("x-atc-action")
      .getByTestId("ux-call-to-action");
    this.seeInCartLink = page.getByRole("link", { name: "See in cart" });
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async seeInCart(): Promise<void> {
    await this.seeInCartLink.click();
  }
}
