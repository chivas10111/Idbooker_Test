import { expect, test } from "playwright/test";
import { Account } from "../pages/Account";
import { Booking } from "../pages/Booking";

test.describe("Create booking Idbooker", async () => {
  let account = new Account("sang.nguyen", "Sang@123");
  let booking = new Booking("0903310351", "Bùi Tiến Minh");
  test("Handling create booking Idbooker", async ({ page }) => {
    await page.goto("https://idbooker-staging.idtek.com.vn/");
    await page.locator(`//input[@id='Username']`).fill(account.getUsername());
    await page.locator(`//input[@id='Password']`).fill(account.getPassword());
    await page.locator(`//button[contains(@class,'login-btn')]`).click();
    await page.locator(`//span[@aria-label='right']`).click();
    await page.locator(`//table[@class='e-schedule-table e-content-table']//tbody`).click({ button: "right" });
    await page.locator(`//li[@id='add']`).click();
    await page.waitForSelector(`//div[contains(@class,'react-draggable')]`);
    // await page.locator(`//div[@class='container-cell phone-input']//input`).click();
    // await page.locator(`//div[@class='ant-popover-inner-content']//div[8]`).click();       // Option 2
    await page.locator(`//div[@data-testid="phone-component"]//input`).clear(); // Để reset trường input SDT, trường input SDT được gán giá trị mặc định nên phải reset
    await page.locator(`//div[@data-testid="phone-component"]//input`).fill(booking.getPhoneNumber());
    await page.locator(`//div[@name='form --customername -field']//input`).fill(booking.getCustomerName());
    await page.locator(`//div[contains(@class,'choose-service')]`).click();
    await page.locator(`//div[@id='39a12c92-5dce-45a5-9863-8883f2bf4616']`).click();
    // await page.locator(`//div[@class='ag-center-cols-viewport']//div[@col-id='duration']`).click();     // Thay đổi giá tiền
    // await page.locator(`//div[@class='ag-center-cols-viewport']//div[@col-id='duration']`).fill('60');
    await page.locator(`//span[@aria-label='save']//parent::button`).click();
    expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
    await page.waitForTimeout(5000);
  });

  test("Handling create fixed booking Idbooker", async ({ page }) => {
    const randomNumber = Math.floor(Math.random() * 51); 
    await page.goto("https://idbooker-staging.idtek.com.vn/");
    await page.locator(`//input[@id='Username']`).fill(account.getUsername());
    await page.locator(`//input[@id='Password']`).fill(account.getPassword());
    await page.locator(`//button[contains(@class,'login-btn')]`).click();
    await page.locator(`//span[@aria-label='right']`).click();
    await page.locator(`//table[@class='e-schedule-table e-content-table']//tbody`).click({ button: "right" });
    await page.locator(`//li[@id='add-group']`).click();
    await page.locator(`//input[@value='Day']`).check();
    await page.locator(`(//input[@value='number'])`).check();
    await page.locator(`//input[@name='frequencyDay']`).clear(); // Để reset trường input Ngày trong tuần
    await page.locator(`//input[@name='frequencyDay']`).fill("2");
    await page.locator(`//input[@name='number']`).fill("3");
    await page.locator(`//div[@class='search-cpn-phone']`).click();
    await page.locator(`//div[@class='ant-popover-inner-content']//div[${randomNumber}]`).click();
    await page.locator(`//div[contains(@class,'choose-service')]`).click();
    await page.locator(`//div[@id='39a12c92-5dce-45a5-9863-8883f2bf4616']`).click();
    await page.locator(`//button[@class='id-form-button btn-success']`).click();
    expect (await page.locator(`//div[contains(@class, 'ant-notification-notice-description')]//span`).textContent()).toBe('Lưu thành công');
    // const messageAlert = page.locator(`//*[@class="ant-notification-notice-description"]//*[contains(@data-testid,"alert-")]`);
    // await expect(messageAlert).toContainText('Lưu thành công');   // Option 2
    await page.waitForTimeout(5000);
  });

  test('Handling close yard', async ({page}) => { 
    await page.goto("https://idbooker-staging.idtek.com.vn/");
    await page.locator(`//input[@id='Username']`).fill(account.getUsername());
    await page.locator(`//input[@id='Password']`).fill(account.getPassword());
    await page.locator(`//button[contains(@class,'login-btn')]`).click();
    await page.locator(`//span[@aria-label='right']`).click();
    await page.locator(`//table[@class='e-schedule-table e-content-table']//tbody`).click({ button: "right" });
    await page.locator(`//li[@id='offTimeTech']`).click();
    await page.locator(`//input[@class='swal2-input']`).fill(`Maintainance`);
    await page.locator(`//button[contains(@class,'swal2-confirm')]`).click();
    // expect (await page.locator(`//span[@class='unbreak-click']`).textContent()).toBe('Bỏ lịch vắng');
    await page.waitForTimeout(5000);
   })
});
