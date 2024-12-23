import { expect, test } from "playwright/test";
import { Account } from "../../pages/Account";

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
        await page.getByRole('cell', { name: '31' }).first().click();
        await page.locator(`//button[contains(@class,'btn-success')]`).click();
        expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });

    test('Handling edit a package', async ({ page }) => {
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//i[@class='fa fa-shopping-bag side-menu-icon']//ancestor::div[@role='menuitem']`).click();
        await page.locator(`//a[@href='/package']`).click();
        await page.locator(`//span[normalize-space()='IYHXWF']//ancestor::div[@role='row']`).click();
        await page.locator(`//div[contains(@class,'ag-row-selected')]//a[contains(@class,'action-btn-edit')]`).click();
        await page.locator(`//span[contains(text(),'Dịch vụ')]//parent::button`).click();
        await page.locator(`//div[contains(@data-testid,'tree-grid--gobal-filter')]//input`).fill('3');
        await page.locator(`//div[@class='ag-row ag-row-no-focus ag-row-odd ag-row-level-1 ag-row-position-absolute ag-row-last']//div[@class='id-grid-action-row-wrap']`).click();
        await page.locator(`//button[contains(@class,'btn btn-secondary')]`).click();
        await page.locator(`//div[@data-testid='number-component']//input[@class='text-input']`).fill('2');
        await page.locator(`//button[contains(@class,'btn-success')]`).click();
        expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
});