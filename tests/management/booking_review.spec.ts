import { expect, test } from "playwright/test";
import { Account } from "../pages/Account";
import { Booking } from "../pages/Booking";

test.describe("Booking review Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    let booking = new Booking("0903310351", "Bùi Tiến Minh");
    test('Handling update booking review', async ({page}) => { 
        await page.goto("https://idbooker-staging.idtek.com.vn/");  // Áp dụng lịch hẹn bắt đầu thi đấu, checkin
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//div[contains(@class,'ag-row-position-absolute ag-row-first')]//a[contains(@class,'action-btn-edit')]`).click();
        await page.locator(`//textarea`).fill('Cảm ơn quý khách đã góp ý');
        await page.locator(`//button[@type='submit']`).click();
        expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
});