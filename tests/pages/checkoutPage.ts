import { Page, Locator, expect } from "@playwright/test";

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  streetAddress: string;
  streetAddress2: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  confirmEmail: string;
  phoneNumber: string;
}

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly streetAddressInput: Locator;
  readonly streetAddress2Input: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly emailInput: Locator;
  readonly confirmEmailInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByRole('textbox', { name: 'First name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
    this.streetAddressInput = page.getByRole('textbox', { name: 'Street address', exact: true });
    this.streetAddress2Input = page.getByRole('textbox', { name: 'Street address 2 (optional)' });
    this.cityInput = page.getByRole('textbox', { name: 'City' });
    this.stateInput = page.getByRole('textbox', { name: 'State/Province/Region' });
    this.zipCodeInput = page.getByRole('textbox', { name: 'ZIP code' });
    this.emailInput = page.getByRole('textbox', { name: 'Email', exact: true });
    this.confirmEmailInput = page.getByRole('textbox', { name: 'Confirm email' });
    this.phoneNumberInput = page.getByRole('textbox', { name: 'Phone number (required)' });
    this.submitButton = page.locator('[data-test-id="ADD_ADDRESS_SUBMIT"]');
  }

  async fillShippingInfo(shippingInfo: ShippingInfo): Promise<void> {
    await this.firstNameInput.fill(shippingInfo.firstName);
    await this.lastNameInput.fill(shippingInfo.lastName);
    await this.streetAddressInput.fill(shippingInfo.streetAddress);
    await this.streetAddress2Input.fill(shippingInfo.streetAddress2);
    await this.cityInput.fill(shippingInfo.city);
    await this.stateInput.fill(shippingInfo.state);
    await this.zipCodeInput.fill(shippingInfo.zipCode);
    await this.emailInput.fill(shippingInfo.email);
    await this.confirmEmailInput.fill(shippingInfo.confirmEmail);
    await this.phoneNumberInput.fill(shippingInfo.phoneNumber);
    await this.submitButton.click();
  }

  async verifyShippingInfo(shippingInfo: ShippingInfo): Promise<void> {
    const fullName = `${shippingInfo.firstName} ${shippingInfo.lastName}`;
    const streetAddressWithLine2 = `${shippingInfo.streetAddress}, ${shippingInfo.streetAddress2}`;
    const cityAndState = `${shippingInfo.city}, ${shippingInfo.state}`;
    const formattedPhone = `${shippingInfo.phoneNumber}`;

    await expect(this.page.getByText(fullName)).toBeVisible();
    await expect(this.page.getByText(streetAddressWithLine2)).toBeVisible();
    await expect(this.page.getByText(cityAndState)).toBeVisible();
    await expect(this.page.getByText(shippingInfo.email)).toBeVisible();
    await expect(this.page.getByText(formattedPhone)).toBeVisible();
  }
}
