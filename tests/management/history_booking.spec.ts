import { expect, test } from "playwright/test";
import { Account } from "../pages/Account";

test.describe("History booking Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling create history booking', async ({ page }) => {
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//a[contains(@href,'/booking/index')]`).click();
        await page.locator(`//button[contains(@class,'create-btn')]`).click();
        await page.locator(`//div[@class='container-cell phone-input']//input`).click();
        await page.locator(`//div[@class='ant-popover-inner-content']//div[8]`).click();
        await page.locator(`//div[contains(@class,'choose-service')]`).click();
        await page.locator(`//div[@id='39a12c92-5dce-45a5-9863-8883f2bf4616']`).click();
        await page.locator(`//div[@col-id="technicianId"][@role="gridcell"]`).click();
        await page.locator(`//div[@id='203f1c57-8eba-4178-866f-8ed270f0d16e'][@title='Sân số 5']`).click();
        await page.locator(`//span[@aria-label='save']//parent::button`).click();
        expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
    
    test('Handling payment history booking at Action Row', async ({ page }) => {
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//a[contains(@href,'/booking/index')]`).click();
        await page.locator(`//span[normalize-space()='037895']//ancestor::div[@role='row']`).click();
        await page.locator(`//div[contains(@class,'ag-row-selected')]//span[contains(@class,'id-popover-trigger')]`).click();
        await page.locator(`//span[@aria-label='dollar']//ancestor::li`).click();
        await page.locator(`//div[contains(@class,'methods')]//div[3]`).click();
        await page.locator(`//span[contains(@class,'ant-checkbox-checked')]//ancestor::div[@class='ant-space-item']`).click();
        await page.locator(`//span[normalize-space()='CHUYỂN KHOẢN']//ancestor::div[@class='ant-space-item']`).click();
        await page.locator(`//button[contains(@class,'btn-primary-lighter')]`).click();
        expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
});