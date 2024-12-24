import { expect, test } from "playwright/test";
import { Account } from "../../pages/Account";

test.describe("Request Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling create new request', async ({ page }) => {
        // Đăng nhập
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        // Chuyển đến trang quản lý mục kho phần yêu cầu
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//i[@class='fa fa-truck side-menu-icon']//ancestor::div[@role='menuitem']`).click();
        await page.locator(`//a[@href='/inventory/request']`).click();
        // Tạo mới yêu cầu xuất kho/nhập kho
        await page.locator(`//button[contains(@class,'create-btn')]`).click();
        await page.locator(`//input[@name='title']`).fill('[23.12] Nhập nước suối');
        await page.locator(`//div[contains(@name,'productId')]`).click();
        await page.locator(`//div[contains(@title,'Aquafina')]`).click();
        await page.locator(`//input[@name='products.0.quantity']`).fill('10');
        await page.locator(`//button[@class='id-form-button btn-clone']`).click();
        expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
});