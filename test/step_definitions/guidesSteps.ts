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
});

Then("I go to the guide request page", () => {
  I.amOnPage("/guides/becomeGuide");
  I.wait(2);
});

When("I enter request form fields:", (formData) => {
  formData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});

Then("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I go to the home page", () => {
  I.amOnPage("/");
  I.wait(2);
});

Given("I am on sign in page", () => {
  I.amOnPage("/login");
  I.wait(1);
});

When("I enter form fields:", (userData) => {
  userData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});

Then("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
  I.wait(2);
});

Then("I go to the guides order page", () => {
  I.amOnPage("/admin/guideOrders/1");
  I.wait(2);
});

When('I click the first "Accept" link', async () => {
  I.click('//a[contains(text(), "Accept")][1]');
  I.wait(2);
});

Then("I go to the guide creation page", async () => {
  const currentUrl = await I.grabCurrentUrl();

  const parts = currentUrl.split("/");
  const id = parts[parts.length - 1];
  I.amOnPage(`/guideOrders/${id}`);

  I.wait(1);
});

When("I enter guides form fields:", (userData) => {
  userData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});

When(
  "I attach the guide file {string} to the {string} input",
  (filePath, inputSelector) => {
    I.attachFile(inputSelector, filePath);
  },
);

When("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
  I.wait(2);
});

Then("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
  I.wait(2);
});

Then("I go back to the guides order page", () => {
  I.amOnPage("/admin/guideOrders/1");
  I.wait(2);
});

Given("I am on sign in page", () => {
  I.amOnPage("/login");
  I.wait(1);
});

When("I enter form fields:", (userData) => {
  userData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});

Then("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
  I.wait(2);
});

Then("I go to the guides page", () => {
  I.amOnPage("/admin/guides/1");
  I.wait(2);
});

When('I click the first "Delete" button', async () => {
  I.click('//button[contains(text(), "delete")][1]');
  I.wait(2);
});

Then(
  "I see the confirmation alert {string}",
  async (confirmationMessage: string) => {
    const alertText = await I.grabPopupText();
    assert.equal(
      alertText,
      confirmationMessage,
      `Expected alert message: ${confirmationMessage}, Actual: ${alertText}`,
    );
  },
);

Then(
  'I confirm the deletion by clicking "ok" in the confirmation alert',
  () => {
    I.acceptPopup();
    I.wait(2);
  },
);

Then("I stay at the guides page", () => {
  I.amOnPage("/admin/guides/1");
});
