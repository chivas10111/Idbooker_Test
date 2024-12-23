import { expect, test } from "playwright/test";
import { Account } from "../../pages/Account";

test.describe("Request freight Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling create new request freight', async ({ page }) => {
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//i[@class='fa fa-truck side-menu-icon']//ancestor::div[@role='menuitem']`).click();
        await page.locator(`//a[@href='/inventory/stock']`).click();
        await page.locator(`//div[@name='warehouseId']`).click();
        await page.locator(`//div[@title='Kho Tổng']`).click();
        await page.locator(`//div[@name='productTypes']`).click();
        await page.locator(`//div[contains(@title,'Sản phẩm thường')]`).click();
        await page.locator(`//div[@name='available']`).click();
        await page.locator(`//div[contains(@class,'ant-select-item-option-content')][contains(text(),'Hoạt động')]`).click();
        await page.locator(`//button[contains(@class,'btn-filter-action')]`).click();
        await page.waitForTimeout(5000);
    });
});