import { expect, test } from "playwright/test";
import { Account } from "./pages/Account";
import { Booking } from "./pages/Booking";

test.describe("Booking workflow Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    let booking = new Booking("0903310351", "Bùi Tiến Minh");
    test('Handling waiting booking to checkin booking', async ({page}) => { 
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//div[contains(text(),'037850')]//ancestor::div[contains(@class, 'e-appointment-details')]`).click({button: "right"});
        await page.locator(`//li[@id='check-in']`).click();
        await page.locator(`//button[contains(@class,'swal2-confirm')]`).click();
        expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
    test('Handling waiting booking to starting booking', async ({page}) => { 
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//div[contains(text(),'037855')]//ancestor::div[contains(@class, 'e-appointment-details')]`).click({button: "right"});
        await page.locator(`//li[@id='start-no-skip']`).click();
        await page.locator(`//button[contains(@class,'swal2-confirm')]`).click();
        expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
    test('Handling waiting booking to complete booking', async ({page}) => { 
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//div[contains(text(),'037857')]//ancestor::div[contains(@class, 'e-appointment-details')]`).click({button: "right"});
        await page.locator(`//li[@id='complete']`).click();
        await page.locator(`//button[contains(@class,'swal2-confirm')]`).click();
        expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Hoàn thành và thanh toán thành công!');
        await page.waitForTimeout(5000);
    });
    test.only('Handling waiting booking to payment booking', async ({page}) => { 
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//div[contains(text(),'037863')]//ancestor::div[contains(@class, 'e-appointment-details')]`).click({button: "right"});
        await page.locator(`//li[@id='payment']`).click();
        await page.locator(`//div[contains(@class,'methods')]//div[3]`).click();
        // await page.locator(`//div[contains(@class,'id-checkbox-list')]//div[2]`).click();
        // await page.waitForSelector(`//div[contains(@class,'id-checkbox-list')]`);
        // await page.locator(`//div[contains(@class,'id-checkbox-list')]//div[1]`).click();
        await page.locator(`//button[contains(@class,'btn-primary-lighter')]`).click();
        expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
});