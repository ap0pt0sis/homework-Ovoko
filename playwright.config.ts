import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config({ quiet: true });

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  reporter: [["html"]],
  workers: 1,
  use: {
    headless: false, 
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: [
    {
      name: "chromium",
      testDir: "./tests/GUI",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "edge",
      testDir: "./tests/GUI",
      use: { ...devices["Desktop Edge"] },
    },
    {
      name: "api",
      testDir: "./tests/API",
      use: {},
    },
  ],
});
