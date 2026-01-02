import { defineConfig } from "@playwright/test";
import * as dotenv from "dotenv";
import path from "path";

/**
 * Load .env file from the root directory
 */
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./src/tests",
  //timeout: 120 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 1,
  outputDir: process.env.CI ? "test-results" : undefined,
  use: {
    headless: process.env.CI ? true : false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    ignoreHTTPSErrors: true,
  },

  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    [
      "junit",
      {
        outputFile: "test-results/results.xml",
        stripANSIControlSequences: true,
      },
    ],
  ],

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
    },
  ],
});
