import { expect, test } from "playwright/test";
import { Account } from "../pages/Account";

test.describe("Customer Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling create new customer', async ({ page }) => {
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//a[@href='/customer']`).click();
        await page.locator(`//button[contains(@class,'create-btn')]`).click();
        await page.locator(`//input[@name='name']`).fill('Sang Nguyen');
        await page.locator(`//input[@name='phone']`).clear();
        await page.locator(`//input[@name='phone']`).fill('0831157022');
        await page.locator(`//input[@name='address']`).fill('206 Ba Thang Hai Street Ho Chi Minh City');
        await page.locator(`//button[@type='submit']`).click();
        expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
});