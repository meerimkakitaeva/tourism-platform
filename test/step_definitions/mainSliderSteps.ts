import assert from "assert";

const { I } = inject();

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

When("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I go to the home page", () => {
  I.amOnPage("/en");
  I.wait(2);
});

When("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I go to the slider creation page", () => {
  I.amOnPage("/slider/create");
  I.wait(2);
});
When("I enter form fields:", (formData) => {
  formData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});
When(
  "I attach the file {string} to the {string} input",
  (filePath, inputSelector) => {
    I.attachFile(inputSelector, filePath);
  },
);

Then("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});
Then("I go to the home page", () => {
  I.amOnPage("/en");
  I.wait(3);
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

When("I click the {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I navigate to the home page", () => {
  I.amOnPage("/en");
  I.wait(2);
});

Then('I click the "SPB" span', () => {
  I.click('//span[contains(text(), "SPB")]');
});
When('I click the "Edit" link', async () => {
  I.click('//a[contains(text(), "Edit")]');
  I.wait(2);
});
When("I navigate to the edit page", async () => {
  const currentUrl = await I.grabCurrentUrl();

  const parts = currentUrl.split("/");
  const id = parts[parts.length - 1];
  I.amOnPage(`/slider/edit/${id}`);
  I.wait(1);
});
When(
  "I attach the new file {string} to the {string} input",
  (filePath, inputSelector) => {
    I.attachFile(inputSelector, filePath);
    I.wait(1);
  },
);
Then("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});
Then("I go to the home page", () => {
  I.wait(1);
  I.amOnPage("/en");
});
Given("I am on sign in page", () => {
  I.amOnPage("/login");
  I.wait(1);
});

When("I enter form fields:", (formData) => {
  formData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});

When("I click the {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I navigate to the home page", () => {
  I.amOnPage("/en");
  I.wait(2);
});

Then('I click the "SPB" span', () => {
  I.click('//span[contains(text(), "SPB")]');
  I.wait(2);
});

Then('I click the "Delete" button', () => {
  I.click('//button[contains(text(), "Delete")]');
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

Then("I stay on the home page", () => {
  I.amOnPage("/");
});
