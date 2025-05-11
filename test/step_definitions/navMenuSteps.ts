import assert from "assert";

const { I } = inject();

Given("I am on home page", () => {
  I.amOnPage("/en");
  I.wait(2);
});

When("I click {string} link", (text: string) => {
  I.click(`//a[contains(text(), '${text}')]`);
});

Then("I go to the tours page", () => {
  I.amOnPage("/tours/all/1");
  I.wait(5);
});

Then("I go to the about us page", () => {
  I.amOnPage("/about");
  I.wait(5);
});

Then("I go to the news page", () => {
  I.amOnPage("/news/all/1");
  I.wait(5);
});

Then("I go to the contact us page", () => {
  I.amOnPage("/contactUs");
  I.wait(5);
});

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

When("I click the {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I go to the home page", () => {
  I.amOnPage("/en");
  I.wait(3);
});

Then("I go to the profile page", () => {
  I.seeInCurrentUrl("/profile");
  I.wait(5);
});

When("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I go to the orders page", () => {
  I.seeInCurrentUrl("/orders/allOrders");
  I.wait(5);
});

Then("I go to the admin page", () => {
  I.seeInCurrentUrl("/admin");
  I.wait(5);
});
