import { test, expect } from "@playwright/test";

test.describe("Smoke test", () => {
  test("should load the base URL without errors", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/.+/);
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("text=vite + react")).toBeVisible();
  });
});
