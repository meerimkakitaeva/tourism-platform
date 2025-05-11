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

Then("I go to the news creation page", () => {
  I.amOnPage("/news/create");
  I.wait(2);
});

When("I enter news form fields:", (formData) => {
  formData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});

When(
  "I attach the news file {string} to the {string} input",
  (filePath, inputSelector) => {
    I.attachFile(inputSelector, filePath);
  },
);

Then("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

When("I enter category form fields:", (formData) => {
  formData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});

Then("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I go to the home page", () => {
  I.amOnPage("/en");
  I.wait(3);
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

Then("I go to the admin news page", () => {
  I.amOnPage("/admin/news/1");
  I.wait(2);
});

When('I click the {string} button', (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
  I.wait(2);
});

When('I click the first "Edit" news link', async () => {
  I.click('(//a[contains(text(), "edit")])[1]');
  I.wait(2);
});

When("I navigate to the news edit page", async () => {
  const currentUrl = await I.grabCurrentUrl();

  const parts = currentUrl.split("/");
  const id = parts[parts.length - 1];
  I.amOnPage(`/news/edit/${id}`);
  I.wait(1);
});

When(
  "I attach the news file {string} to the {string} input",
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

Then("I go to the admin news page", () => {
  I.amOnPage("/admin/news/1");
  I.wait(2);
});
When('I click the {string} button', (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
  I.wait(2);
});
When('I click the first "Delete" button', async () => {
  I.click('(//button[contains(text(), "delete")])[1]');
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

Then("I stay on the news admin page", () => {
  I.amOnPage("/admin/news/1");
});