import { expect, test } from "playwright/test";
import { Account } from "./pages/Account";
import { Booking } from "./pages/Booking";

test.describe("Create booking Idbooker", async () => {
  let account = new Account("sang.nguyen", "Sang@123");
  let booking = new Booking("0903310351", "Bùi Tiến Minh");
  test.only("Handling create booking Idbooker", async ({ page }) => {
    await page.goto("https://idbooker-staging.idtek.com.vn/");
    await page.locator(`//input[@id='Username']`).fill(account.getUsername());
    await page.locator(`//input[@id='Password']`).fill(account.getPassword());
    await page.locator(`//button[contains(@class,'login-btn')]`).click();
    await page.locator(`//span[@aria-label='right']`).click();
    await page
      .locator(`//table[@class='e-schedule-table e-content-table']//tbody`)
      .click({ button: "right" });
    await page.locator(`//li[@id='add']`).click();
    await page.waitForSelector(`//div[contains(@class,'react-draggable')]`);
    // await page
    // .locator(`//div[@class='container-cell phone-input']//input`)
    // .click();
    // await page.locator(`//div[@class='ant-popover-inner-content']//div[8]`).click();       // Option 2
    await page.locator(`//div[@data-testid="phone-component"]//input`).clear();   // Để reset trường input SDT, trường input SDT được gán giá trị mặc định nên phải reset
    await page
      .locator(`//div[@data-testid="phone-component"]//input`)
      .fill(booking.getPhoneNumber());
    await page
      .locator(`//div[@name='form --customername -field']//input`)
      .fill(booking.getCustomerName());
    await page.locator(`//div[contains(@class,'choose-service')]`).click();
    await page
      .locator(`//div[@id='39a12c92-5dce-45a5-9863-8883f2bf4616']`)
      .click();
    // await page.locator(`//div[@class='ag-center-cols-viewport']//div[@col-id='duration']`).click();
    // await page.locator(`//div[@class='ag-center-cols-viewport']//div[@col-id='duration']`).fill('60');
    await page.locator(`//span[@aria-label='save']//parent::button`).click();
    expect (await page.locator(`//div[contains(@aria-label,'037844')]//div[contains(@class,'e-phone')]`).textContent()).toContain(booking.getPhoneNumber());
    await page.waitForTimeout(5000);
  });

  test('Handling create fixed booking Idbooker', async ({page}) => {
    await page.goto("https://idbooker-staging.idtek.com.vn/");
    await page.locator(`//input[@id='Username']`).fill(account.getUsername());
    await page.locator(`//input[@id='Password']`).fill(account.getPassword());
    await page.locator(`//button[contains(@class,'login-btn')]`).click();
    await page
      .locator(`//table[@class='e-schedule-table e-content-table']//tbody`)
      .click({ button: "right" });
    await page.locator(`//li[@id='add-group']`).click();
    await page.locator(`//input[@value='Day']`).check();
    await page.waitForTimeout(5000);
   });
});
