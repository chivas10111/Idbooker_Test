import { expect, test } from "playwright/test";
import { Account } from "../../pages/Account";

test.describe("Condition price Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling create new condition', async ({ page }) => {
        // Đăng nhập
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        // Chuyển sang tab quản lý mục chính sách giá phần thiết lập
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//i[@class='fa fa-money side-menu-icon']//ancestor::div[@role='menuitem']`).click();
        await page.locator(`//a[@href='/price-strategy/condition']`).click();
        // Tạo mới điều kiện
        await page.locator(`//button[contains(@class,'create-btn')]`).click();
        await page.locator(`//input[@name='name']`).fill('Lễ tết');
        await page.locator(`//div[@name='type']`).click();
        await page.locator(`//div[contains(@title,'Ngày cụ thể')]`).click();
        await page.locator(`//div[@name='date']`).click();
        await page.locator(`//td[@title='2025-01-25']`).click();
        await page.locator(`//td[@title='2024-12-25']`).click();
        await page.locator(`//button[contains(@class,'btn-success')]`).click();
        expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
});