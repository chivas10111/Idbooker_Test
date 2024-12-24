import { expect, test } from "playwright/test";
import { Account } from "../../pages/Account";

test.describe("Product Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling edit product', async ({ page }) => {
        // Đăng nhập
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        // Chuyển đến trang quản lý mục kho phần sản phẩm
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//i[@class='fa fa-truck side-menu-icon']//ancestor::div[@role='menuitem']`).click();
        await page.locator(`//a[@href='/inventory/product']`).click();
        // Chỉnh sửa giá sản phẩm
        await page.locator(`//div[contains(@class,'ag-row-position-absolute ag-row-first')]//a[contains(@class,'action-btn-edit')]`).click();
        await page.locator(`//input[@name='productUnit[0].value']`).fill('24');
        await page.locator(`//input[@name='productItems[0].price']`).fill('200.000');
        await page.locator(`//button[@type='submit']`).click();
        expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
});