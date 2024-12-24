import { expect, test } from "playwright/test";
import { Account } from "../pages/Account";

test.describe("Payment method Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling create new payment method', async ({ page }) => {
        // Đăng nhập
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        // Chuyển sang tab quản lý mục phương thức thanh toán
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//a[@href='/system/payment-method']`).click();
        // Tạo phương thức thanh toán mới
        await page.locator(`//button[contains(@class,'create-btn')]`).click();
        await page.locator(`//input[@name='name']`).fill('Black friday');
        await page.locator(`//div[@name='status']`).click();
        await page.locator(`//div[@title='Đang mở']`).click();
        await page.locator(`//input[@value='percent']`).check();
        await page.locator(`//input[@name='percentFee']`).clear();
        await page.locator(`//input[@name='percentFee']`).fill('50');
        await page.locator(`//input[@name='order']`).clear();
        await page.locator(`//input[@name='order']`).fill('1');
        await page.locator(`//button[contains(@class,'btn-success')]`).click();
        expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
});