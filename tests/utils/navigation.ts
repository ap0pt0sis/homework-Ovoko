import { Page } from "@playwright/test";

export async function navigateToBaseUrl(page: Page): Promise<void> {
  const url = process.env.URL;
  if (!url) {
    throw new Error("URL environment variable is not set");
  }
  await page.goto(url);
}

export async function navigateToBaseUrlAndHandleCookies(page: Page): Promise<void> {
  await navigateToBaseUrl(page);
  const declineButton = page.getByRole("button", { name: "Decline all privacy terms and" });
  if (await declineButton.isVisible()) {
    await declineButton.click();
}
