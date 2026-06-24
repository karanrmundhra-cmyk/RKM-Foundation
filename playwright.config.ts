import { defineConfig, devices } from "@playwright/test";

// Critical-path E2E for the donation flow (SOP-13 / RKMF-024, §12).
// Runs against a PRODUCTION build (so the nonce CSP middleware + real routing
// are exercised). All third-party calls (Razorpay) and the donate API are
// mocked at the network layer, so the suite is deterministic and needs no
// secrets — it verifies OUR flow logic, not Razorpay's servers.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
