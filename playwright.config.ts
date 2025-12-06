import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config({ quiet: true });

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  reporter: "html",
  use: {
    headless: false, 
    screenshot: "only-on-failure"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
  ],
});
