import { expect, test } from "playwright/test";
import { Account } from "../pages/Account";

test.describe("Fixed booking Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling clone fixed booking', async ({ page }) => {
        // Đăng nhập
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        // Chuyển sang tab quản lý mục lịch hẹn cố định
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//a[@href='/booking/group-index']`).click();
        // Sao chép lịch hẹn cố định
        await page.locator(`//span[normalize-space()='3']//ancestor::div[@role='row']`).click();
        await page.locator(`//div[contains(@class,'ag-row-selected')]//a[contains(@class,'action-btn-copy')]`).click();
        await page.locator(`//input[@value='Week']`).check();
        await page.locator(`//input[@value='dayToDay']`).check();
        await page.locator(`//div[@name='configWeek']//div[@class='ant-select-selector']`).click();
        await page.locator(`//div[@class='rc-virtual-list-holder-inner']//div[3]`).click();
        await page.locator(`//div[@class='rc-virtual-list-holder-inner']//div[5]`).click();
        await page.locator(`//div[@name='configWeek']//div[@class='ant-select-selector']`).click();
        await page.locator(`//div[@data-testid='form--enddate-field-content']`).click();
        await page.locator(`//td[@title='2024-12-31']`).click();
        await page.locator(`//button[@class='id-form-button btn-success']`).click();
        expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });

    test('Handling cancel fixed booking', async ({ page }) => {
        // Đăng nhập
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        // Chuyển sang tab quản lý mục lịch hẹn cố định
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//a[@href='/booking/group-index']`).click();
        // Hủy lịch hẹn cố định
        await page.locator(`//span[normalize-space()='2']//ancestor::div[@role='row']`).click();
        await page.locator(`//div[contains(@class,'ag-row-selected')]//a[contains(@class,'action-btn-delete')]`).click();
        await page.locator(`//button[contains(@class,'swal2-confirm')]`).click();
        expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Hủy lịch hẹn cố định thành công');
        await page.waitForTimeout(5000);
    });
});