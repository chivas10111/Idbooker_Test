import { expect, test } from "playwright/test";
import { Account } from "../../pages/Account";

test.describe("Yard Information Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling create new yard', async ({ page }) => {
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//i[@class='fa fa-users side-menu-icon']//ancestor::div[@role='menuitem']`).click();
        await page.locator(`//a[@href='/technician/index']`).click();
        await page.locator(`//button[contains(@class,'create-btn')]`).click();
        await page.locator(`//input[@name='name']`).fill('Sân số 16');
        await page.locator(`//input[@name='priority']`).clear();
        await page.locator(`//input[@name='priority']`).fill('16');
        await page.locator(`//button[contains(text(),'Dịch vụ')]`).click();
        await page.locator(`//button[contains(@class,'button-action-bar action-bar-idbeauty')]`).click();
        await page.locator(`//button[@class='btn-form btn btn-secondary']`).click();
        await page.locator(`//button[contains(@class,'btn-success')]`).click();
        expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
});