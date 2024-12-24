import { expect, test } from "playwright/test";
import { Account } from "../pages/Account";

test.describe("Config branch Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling update off-day', async ({ page }) => {
        // Đăng nhập
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        // Chuyển sang tab quản lý mục thiết lập chung
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//a[@href='/branch/config']`).click();
        // Cập nhật ngày nghỉ & lịch nghỉ lễ
        await page.locator(`//div[@class='branch-second-line-right']//span[@aria-label='edit']//parent::button`).click();
        await page.locator(`//div[@data-testid='date-single-component']`).click();
        await page.locator(`//td[@title='2025-01-01']//div[@class='ant-picker-cell-inner'][normalize-space()='1']`).click();
        await page.locator(`//input[@options='[object Object]']`).fill('Tết Dương Lịch 2025');
        await page.locator(`//a[contains(@class,'action-btn-undefined')]`).click();
        await page.locator(`//button[contains(@class,'swal2-confirm')]`).click();
        expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
});