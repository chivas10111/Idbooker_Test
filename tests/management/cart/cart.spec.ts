import { expect, test } from "playwright/test";
import { Account } from "../../pages/Account";

test.describe("Cart Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling create a new cart', async ({ page }) => {
        // Đăng nhập
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        // Chuyển đến trang quản lý mục giỏ hàng phần giỏ hàng
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//i[@class='fa fa-shopping-bag side-menu-icon']//ancestor::div[@role='menuitem']`).click();
        await page.locator(`//a[@href='/cart']`).click();
        // Tạo mới giỏ hàng
        await page.locator(`//button[contains(@class,'create-btn')]`).click();
        await page.locator(`//img[contains(@src,'8a0c5028-79ad-4e75-b697-2f805c503f08')]//ancestor::div[contains(@class,'box-product-item')]`).click();
        await page.locator(`//img[contains(@src,'62e8907c-1218-463e-9c94-584cbe05986e')]//ancestor::div[contains(@class,'box-product-item')]`).click();
        await page.locator(`//span[@class='ant-collapse-header-text']`).click();
        await page.locator(`//div[@class='combo-search-guest']`).click();
        await page.locator(`//div[contains(@class,'ant-select-item-option-active')]`).click();
        await page.locator(`//input[@name='isHst']`).check();
        await page.locator(`//button[contains(@class,'btn-success')]`).click();
        expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Tạo mới thành công');
        await page.waitForTimeout(5000);
    });

    test('Handling edit and payment cart', async ({ page }) => {
        // Đăng nhập
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        // Chuyển đến trang quản lý mục giỏ hàng phần giỏ hàng
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//i[@class='fa fa-shopping-bag side-menu-icon']//ancestor::div[@role='menuitem']`).click();
        await page.locator(`//a[@href='/cart']`).click();
        // Chỉnh sửa và thanh toán giỏ hàng
        await page.locator(`//span[normalize-space()='3']//ancestor::div[@role='row']`).click();
        await page.locator(`//div[contains(@class,'ag-row-selected')]//a[contains(@class,'action-btn-edit')]`).click();
        await page.locator(`//button[contains(@class,'btn-primary-lighter')]`).click();
        expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Tạo mới thành công');
        await page.waitForTimeout(5000);
    });
});