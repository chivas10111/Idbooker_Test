import { expect, test } from "playwright/test";
import { Account } from "../pages/Account";

test.describe("Other option booking Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling back to waiting booking', async ({page}) => { 
        await page.goto("https://idbooker-staging.idtek.com.vn/");  // Áp dụng lịch hẹn bắt đầu thi đấu, checkin
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//div[contains(text(),'037881')]//ancestor::div[contains(@class, 'e-appointment-details')]`).click({button: "right"});
        await page.locator(`//li[@id='back-to-waiting']`).click();
        await page.locator(`//button[contains(@class,'swal2-confirm')]`).click();
        expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });

    test('Handling cart booking', async ({page}) => {   // Áp dụng lịch hẹn bắt đầu thi đấu
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//div[contains(text(),'037888')]//ancestor::div[contains(@class, 'e-appointment-details')]`).click({button: "right"});
        await page.locator(`//li[@id='cart']`).click();
        await page.locator(`//div[contains(@class,'ant-collapse-icon-position-end')]/div[1]/div[1]`).click();
        await page.locator(`//div[@class='combo-search-guest']`).click();
        await page.locator(`//div[contains(@class,'ant-select-item-option-active')]//div[contains(@class,'ant-select-item-option-content')]`).click();
        await page.locator(`//div[@id='rcDialogTitle0']`).click({button: 'left'});
        await page.locator(`//button[contains(@class,'btn-primary-lighter')]`).click();
        await page.locator(`//span[@aria-label='check-square']//parent::button`).click();
        expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });

    test('Handling cancel bill booking', async ({page}) => {   // Áp dụng lịch hẹn hoàn thành
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//div[contains(text(),'037888')]//ancestor::div[contains(@class, 'e-appointment-details')]`).click({button: "right"});
        await page.locator(`//li[@id='cancelBill']`).click();
        await page.locator(`//button[contains(@class,'swal2-confirm')]`).click();
        expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Hủy thành công');
        await page.waitForTimeout(5000);
    });

    test('Handling clone booking', async ({page}) => {   // Áp dụng lịch hẹn hoàn thành
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//div[contains(text(),'037881')]//ancestor::div[contains(@class, 'e-appointment-details')]`).click({button: "right"});
        await page.locator(`//li[@id='detail']`).click();
        await page.locator(`//button[contains(@class,'btn-clone')]`).click();
        await page.locator(`//div[@name='form --starttime -field']//div[@class='input-field']//input`).fill('19/12/2024 20:00');
        await page.locator(`//span[@aria-label='save']//parent::button`).click();
        expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });

    test('Handling change yard and time for booking', async ({page}) => {   // Trừ lịch hẹn hoàn thành
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//div[contains(text(),'037884')]//ancestor::div[contains(@class, 'e-appointment-details')]`).dragTo(page.locator(`//table[@class='e-schedule-table e-content-table']//tbody//tr[55]//td[6]`));
        await page.waitForTimeout(5000);
    });
});