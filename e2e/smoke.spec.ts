import { expect, test } from "@playwright/test";

test("the home page loads with the dial and the reading form", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("img", { name: /Dial set to/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /reading/i }).first()).toBeVisible();
});
