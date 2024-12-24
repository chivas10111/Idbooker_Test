import { expect, test } from "playwright/test";
import { Account } from "../../pages/Account";

test.describe("Time sheet Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling setup time for yard', async ({ page }) => {
        // Đăng nhập
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        // Chuyển sang tab quản lý mục hoạt động sân phần lịch hoạt động
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//i[@class='fa fa-users side-menu-icon']//ancestor::div[@role='menuitem']`).click();
        await page.locator(`//a[@href='/technician/time-sheet']`).click();
        // Thiết lập thời gian làm việc cho sân
        await page.locator(`//div[@type='combo']`).click();
        await page.locator(`//div[@title='Sân số 15']`).click();
        await page.locator(`//span[@class='anticon anticon-setting']`).first().click();
        await page.locator(`//input[@value='WORKING']`).click();
        await page.locator(`//button[contains(@class,'global-flex-align-center')]`).click();
        await page.locator(`//div[@name='workingHours[0].type']`).click();
        await page.locator(`//div[contains(@title,'Theo ca')]`).click();  // Chọn option 'Theo ca'
        await page.locator(`//div[contains(@class,'ant-picker-input ant-picker-input-active')]//input`).click();  // Thiết lập thời gian theo ca
        await page.locator(`//div[normalize-space()='10']`).click();
        await page.locator(`//button[contains(@class,'ant-btn-primary ant-btn-sm')]`).click();
        await page.locator(`//div[normalize-space()='23']`).click();
        await page.locator(`//button[contains(@class,'ant-btn-primary ant-btn-sm')]`).click();
        await page.locator(`//button[contains(@class,'btn-success')]`).click();
        expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });

    test('Handling quick setup', async ({ page }) => {
        // Đăng nhập
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        // Chuyển sang tab quản lý mục hoạt động sân phần lịch hoạt động
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//i[@class='fa fa-users side-menu-icon']//ancestor::div[@role='menuitem']`).click();
        await page.locator(`//a[@href='/technician/time-sheet']`).click();
        // Thiết lập nhanh thời gian làm việc cho sân
        await page.locator(`//span[@aria-label='unordered-list']//parent::button`).click();
        await page.locator(`//div[contains(@view,'edit')]`).click();
        await page.locator(`//div[@title='Sân số 15']`).click();
        await page.locator(`//div[contains(@view,'edit')]`).click();
        await page.locator(`//div[@class='id-checkbox-list']//span`).first().uncheck();
        await page.locator(`//button[contains(@class,'btn-success')]`).click();
        expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
});