import { expect, test } from "playwright/test";
import { Account } from "../pages/Account";

test.describe("Service Idbooker", async () => {
    let account = new Account("sang.nguyen", "Sang@123");
    test('Handling create new service', async ({ page }) => {
        // Đăng nhập
        await page.goto("https://idbooker-staging.idtek.com.vn/");
        await page.locator(`//input[@id='Username']`).fill(account.getUsername());
        await page.locator(`//input[@id='Password']`).fill(account.getPassword());
        await page.locator(`//button[contains(@class,'login-btn')]`).click();
        // Chuyển sang tab quản lý mục dịch vụ
        await page.locator(`//header[@class='header-page']/div/div[3]`).click();
        await page.locator(`//a[@href='/service']`).click();
        // Tạo dịch vụ cha mới
        await page.locator(`//div[contains(@class,'base-grid-toolbar')]//button[2]`).click();
        await page.locator(`//input[@name='name']`).fill('Tennis');
        await page.locator(`//button[contains(@class,'btn-success')]`).click();
        // Tạo dịch vụ con mới
        await page.locator(`//div[contains(text(),'Tennis')]//ancestor::div[@role='row']`).click();
        await page.locator(`//div[contains(@class,'ag-row-selected')]//a[@class='action-btn action-btn-undefined']`).click();
        await page.locator(`//input[@name='name']`).fill('Thuê sân tennis');
        await page.locator(`//input[@name='code']`).fill('SANTENNIS');
        await page.locator(`//input[@name='displayIndex']`).clear();
        await page.locator(`//input[@name='displayIndex']`).fill('1');
        await page.locator(`//input[@name='price']`).clear();
        await page.locator(`//input[@name='price']`).fill('120.000');
        await page.locator(`//input[@name='duration']`).clear();
        await page.locator(`//input[@name='duration']`).fill('60');
        await page.locator(`//legend`).click();     // Chọn sân cho dịch vụ con
        await page.locator(`//button[normalize-space()='Sân']`).click();
        for (let i = 0; i <= 7; i++) {
            await page.locator(`//div[@row-index=${i}]//a[contains(@class,'action-edit-idbeauty')]`).click();
        }
        await page.locator(`//span[@aria-label='form']//ancestor::div[contains(@id,'rcDialogTitle')]//span[contains(@class,'anticon-close')]`).click();
        await page.locator(`//button[contains(@class,'btn-success')]`).click();
        // Cập nhật thứ tự hiển thị cho dịch vụ cha
        await page.locator(`//div[contains(@class,'rowParent cell')]//div[contains(@class,'ag-react-container')]//div//input[contains(@placeholder,'Nhập...')]`).clear();
        await page.locator(`//div[contains(@class,'rowParent cell')]//div[contains(@class,'ag-react-container')]//div//input[contains(@placeholder,'Nhập...')]`).fill('1');
        await page.locator(`//div[contains(text(),'Tennis')]//ancestor::div[@role='row']`).click();
        expect(await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Cập nhật thứ tự hiển thị thành công');
        await page.waitForTimeout(5000);
    });
});