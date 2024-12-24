import { expect, test } from "playwright/test";
import { Account } from "../../pages/Account";

test.describe("Request freight Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling create new request freight', async ({ page }) => {
        // Đăng nhập
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        // Chuyển đến trang quản lý mục kho phần chuyển kho
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//i[@class='fa fa-truck side-menu-icon']//ancestor::div[@role='menuitem']`).click();
        await page.locator(`//a[@href='/inventory/request-freight']`).click();
        // Tạo mới yêu cầu chuyển kho
        await page.locator(`//button[contains(@class,'create-btn')]`).click();
        await page.locator(`//input[@name='title']`).fill('[23.12] Chuyển kho nước suối từ cửa hàng bán lẻ sang kho tổng');
        await page.locator(`//div[@name='warehouseExportId']`).click();
        await page.locator(`//div[contains(@class,'ant-select-item-option')]//div[contains(text(),'Cửa hàng bán lẻ')]`).click();
        await page.locator(`//div[@name='warehouseImportId']`).click();
        await page.locator(`//div[contains(@class,'ant-select-item-option-active')]//div[contains(text(),'Kho Tổng')]`).click();
        await page.locator(`//div[@name='products']`).click();
        await page.locator(`//div[@id='fad7a780-6dc7-4a87-a87f-4f7cceb559bc']`).click();
        await page.locator(`//button[@class='id-form-button btn-clone']`).click();
        expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
});