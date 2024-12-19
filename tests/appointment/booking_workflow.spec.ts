import { expect, test } from "playwright/test";
import { Account } from "../pages/Account";

test.describe("Booking workflow Idbooker", async () => {  // Option lịch hẹn đang chờ
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling waiting booking to checkin booking', async ({page}) => { 
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//div[contains(text(),'037874')]//ancestor::div[contains(@class, 'e-appointment-details')]`).click({button: "right"});
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
        await page.locator(`//div[contains(text(),'037879')]//ancestor::div[contains(@class, 'e-appointment-details')]`).click({button: "right"});
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
        await page.locator(`//div[contains(text(),'037850')]//ancestor::div[contains(@class, 'e-appointment-details')]`).click({button: "right"});
        await page.locator(`//li[@id='complete']`).click();
        await page.locator(`//button[contains(@class,'swal2-confirm')]`).click();
        expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Hoàn thành và thanh toán thành công!');
        await page.waitForTimeout(5000);
    });

    test('Handling waiting booking to payment booking', async ({page}) => { 
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//div[contains(text(),'037855')]//ancestor::div[contains(@class, 'e-appointment-details')]`).click({button: "right"});
        await page.locator(`//li[@id='payment']`).click();
        await page.locator(`//div[contains(@class,'methods')]//div[3]`).click();
        await page.locator(`//button[contains(@class,'btn-primary-lighter')]`).click();
        expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });

    test('Handling update booking', async ({page}) => { 
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//div[contains(text(),'037876')]//ancestor::div[contains(@class, 'e-appointment-details')]`).click({button: "right"});
        await page.locator(`//ul[contains(@id,'contextmenu_2')]//li[@id='update']`).click();
        await page.locator(`//div[contains(@class,'choose-service')]`).click();
        await page.locator(`//div[@id='80362cb3-eadb-4fcc-9dd9-0bac9c3c58e5']`).click();
        await page.locator(`//button[@class='id-form-button btn-success']`).click();
        expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });

    test('Handling cancel booking', async ({page}) => {
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//div[contains(text(),'037875')]//ancestor::div[contains(@class, 'e-appointment-details')]`).click({button: "right"});
        await page.locator(`//li[@id='cancel']`).click();
        await page.locator(`//button[contains(@class,'swal2-confirm')]`).click();
        expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
    
    test('Handling no show booking', async ({page}) => { 
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        await page.locator(`//div[contains(text(),'037879')]//ancestor::div[contains(@class, 'e-appointment-details')]`).click({button: "right"});
        await page.locator(`//li[@id='no-show']`).click();
        await page.locator(`//button[contains(@class,'swal2-confirm')]`).click();
        expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
        await page.waitForTimeout(5000);
    });
});