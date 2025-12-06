import { Page } from "@playwright/test";

/**
 * Navigates to the base URL from environment variable
 * @throws Error if URL environment variable is not set
 */
export async function navigateToBaseUrl(page: Page): Promise<void> {
  const url = process.env.URL;
  if (!url) {
    throw new Error("URL environment variable is not set");
  }
  await page.goto(url);
}

/**
 * Navigates to base URL and handles cookie consent
 */
export async function navigateToBaseUrlAndHandleCookies(page: Page): Promise<void> {
  await navigateToBaseUrl(page);
  await page
    .getByRole("button", { name: "Decline all privacy terms and" })
    .click();
}

