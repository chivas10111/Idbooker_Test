import { expect, test } from "playwright/test";
import { Account } from "../../pages/Account";

test.describe("Gift card Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling create and pay gift card', async ({ page }) => {
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//i[@class='fa fa-shopping-bag side-menu-icon']//ancestor::div[@role='menuitem']`).click();
        await page.locator(`//a[@href='/system/gift-card']`).click();
        await page.locator(`//button[contains(@class,'create-and-sell-gift-btn')]`).click();
        await page.locator(`//div[contains(@data-testid,'phone-component')]//input`).click();
        await page.locator(`//div[@class='ant-popover-inner-content']//div[8]`).click();
        await page.locator(`//input[@name='price']`).clear();
        await page.locator(`//input[@name='price']`).fill('500000');
        await page.locator(`//input[@name='value']`).clear();
        await page.locator(`//input[@name='value']`).fill('1000000');
        await page.locator(`//textarea`).fill('Ký quỹ Thanh Sang');
        await page.locator(`//div[contains(@class,'methods')]//div[3]`).click();
        await page.locator(`//span[contains(@class,'ant-checkbox-checked')]//ancestor::div[@class='ant-space-item']`).click();
        await page.locator(`//span[normalize-space()='CHUYỂN KHOẢN']//ancestor::div[@class='ant-space-item']`).click();
        await page.locator(`//button[@type='submit']`).click();
        expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Tài khoản của bạn không có quyền thực hiện thao tác này!');
        await page.waitForTimeout(5000);
    });
});