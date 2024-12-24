import { expect, test } from "playwright/test";
import { Account } from "../../pages/Account";

test.describe("Config price Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling create new price strategy', async ({ page }) => {
        // Đăng nhập
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        // Chuyển sang tab quản lý mục chính sách giá phần thiết lập
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//i[@class='fa fa-money side-menu-icon']//ancestor::div[@role='menuitem']`).click();
        await page.locator(`//a[@href='/price-strategy/config']`).click();
        // Tạo mới chính sách giá
        await page.locator(`//button[contains(@class,'create-btn')]`).click();
        await page.locator(`//input[@name='name']`).fill('Gía thuê sân dịp lễ');
        // Setup giá cho từng khung giờ
        await page.locator(`//button[contains(text(),'Khung giờ và giá')]`).click();
        await page.locator(`//div[contains(@class,'ant-picker-input-active')]//input`).click();
        await page.locator(`//div[normalize-space()='05']`).click();
        await page.locator(`//li[@class='ant-picker-ok']`).click();
        await page.locator(`//div[normalize-space()='12']`).click();
        await page.locator(`//li[@class='ant-picker-ok']`).click();
        await page.locator(`//div[contains(@class,'icon-align-before')]//input`).clear();
        await page.locator(`//div[contains(@class,'icon-align-before')]//input`).fill('150.000');
        // Chọn dịch vụ
        await page.locator(`//div[contains(@class,'grid-auto-height-row')]//div[@class='grid-dock-top']//button`).click();
        await page.locator(`//div[@row-index='0']//div[contains(@class,'id-grid-action-row-wrap')]//a[contains(@class,'idbeauty')]`).click();
        await page.locator(`//button[contains(@class,'btn btn-secondary')]`).click();
        await page.locator(`//button[contains(@class,'btn-success')]`).click();
        expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
});