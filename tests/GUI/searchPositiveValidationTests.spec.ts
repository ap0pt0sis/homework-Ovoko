import { test, expect } from "@playwright/test";
import * as search from '../../pages/search';

test("SearchItem", async ({ page }) => {
  const url = process.env.URL;
  if (!url) {
    throw new Error("URL environment variable is not set");
  }
  await page.goto(url);
  await page.getByRole('button', { name: 'Decline all privacy terms and' }).click();

  await page.getByRole('combobox', { name: 'Search for anything' }).fill('headphones');
  await page.getByRole('button', { name: 'Search', exact: true }).click();

  await expect(page.getByRole('combobox', { name: 'Search for anything' })).toHaveValue('headphones');
});
