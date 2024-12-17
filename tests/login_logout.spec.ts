import { expect, test } from "playwright/test";
import { Account } from "./pages/Account";

test.describe("Login Logout Idbooker", async () => {
  let account = new Account("sang.nguyen", "Sang@123");
  test("Handling login Idbooker", async ({ page }) => {
    await page.goto("https://idbooker-staging.idtek.com.vn/");
    await page.locator(`//input[@id='Username']`).fill(account.getUsername());
    await page.locator(`//input[@id='Password']`).fill(account.getPassword());
    await page.locator(`//button[contains(@class,'login-btn')]`).click();
    const userNameHeader = await page
      .locator(
        `//span[contains(@class,'id-popover-trigger')]//div[contains(@class,'avatar-user')]//span`
      )
      .textContent();
    expect(userNameHeader).toBe(account.getUsername());
  });

  test("Handling logout Idbooker", async ({ page }) => {
    await page.goto("https://idbooker-staging.idtek.com.vn/");
    await page.locator(`//input[@id='Username']`).fill(account.getUsername());
    await page.locator(`//input[@id='Password']`).fill(account.getPassword());
    await page.locator(`//button[contains(@class,'login-btn')]`).click();
    await page.locator(`//div[contains(@class,'avatar-user')]`).click();
    await page.locator(`//div[@role='tooltip']//div[2]`).click();
    await page
      .locator(
        `//div[@class='swal2-actions']//button[contains(@class,'confirm')]`
      )
      .click();
    await page.waitForLoadState();
    const loginTitle = await page
      .locator(`//span[@class='title-brand color-themes']`)
      .textContent();
    expect(loginTitle).toContain("ĐĂNG NHẬP");
  });
});
