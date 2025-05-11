import assert from "assert";

const { I } = inject();

Given("I am on sign in page", () => {
  I.amOnPage("/en/login");
  I.wait(1);
});

When("I enter form fields:", (userData) => {
  userData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});

When("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
  I.wait(3);
});

When('I click "Save" button', async () => {
  I.waitForClickable('//button[contains(text(), "Save")]', 10);
  I.click('//button[contains(text(), "Save")]');
  I.wait(3);
});

When("I click {string} link", (text: string) => {
  I.click(`//a[contains(text(), '${text}')]`);
});

Then("I go to the partner accepting page", () => {
  I.amOnPage("/en/admin/partnerOrders/1");
  I.wait(5);
});

When('I click the first "Accept" button', async () => {
  I.click('//button[contains(text(), "Accept")][1]');
  I.wait(3);
});

Then("I go to the home page", () => {
  I.amOnPage("/");
  I.wait(4);
});

Then("I go to the admin partner page", () => {
  I.amOnPage("/admin/partners/all");
  I.wait(5);
});

When("I navigate to the partner edit page", async () => {
  const currentUrl = await I.grabCurrentUrl();

  const parts = currentUrl.split("/");
  const id = parts[parts.length - 1];
  I.amOnPage(`/en/partners/edit/${id}`);
  I.wait(3);
});
When("I enter new partner form fields:", (userData) => {
  userData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.clearField(fieldName.value);
    I.fillField(fieldName.value, fieldValue.value);
  });
});
Then("I click save partner button", () => {
  I.click('//button[@type="submit" and @class="form-btn" and text()="Save"]');
  I.wait(3);
});
