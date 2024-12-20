import { expect, test } from "playwright/test";
import { Account } from "../pages/Account";

test.describe("Package Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling create a new package', async ({ page }) => {
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//i[@class='fa fa-shopping-bag side-menu-icon']//ancestor::div[@role='menuitem']`).click();
        await page.locator(`//a[@href='/package']`).click();
        await page.locator(`//button[contains(@class,'create-btn')]`).click();
        await page.locator(`//input[@name='content']`).fill('Test package');
        await page.locator(`//input[@name='price']`).clear();
        await page.locator(`//input[@name='price']`).fill('100000');
        await page.locator(`//div[contains(@data-testid,'starttime')]//div[@class='ant-picker']`).click();
        await page.locator(`//a[contains(@class,'today')]`).click();
        await page.locator(`//div[@data-testid='form--endtime-field-content']`).click();

        // expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Tạo mới thành công');
        await page.waitForTimeout(5000);
    });

});