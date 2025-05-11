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

Then("I go to the employee creation page", () => {
  I.amOnPage("/employees/create");
  I.wait(2);
});

When("I enter employee form fields:", (formData) => {
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
Then("I go to the admin employee page", () => {
  I.amOnPage("/admin/employees/all");
  I.wait(2);
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

When("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I go to the admin employee page", () => {
  I.amOnPage("/admin/employees/all");
  I.wait(2);
});

When('I click the first "Edit" link', async () => {
  I.click('//a[contains(text(), "Edit")][1]');
  I.wait(2);
});

When("I navigate to the employee edit page", async () => {
  const currentUrl = await I.grabCurrentUrl();

  const parts = currentUrl.split("/");
  const id = parts[parts.length - 1];
  I.amOnPage(`/en/employees/edit/${id}`);
  I.wait(1);
});

When(
  "I attach the employee file {string} to the {string} input",
  (filePath, inputSelector) => {
    I.attachFile(inputSelector, filePath);
  },
);

Then("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I go to the admin employee page", () => {
  I.amOnPage("/admin/employees/all");
  I.wait(2);
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

When("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I go to the admin employee page", () => {
  I.amOnPage("/admin/employees/all");
  I.wait(2);
});

When('I click the first "Delete" employee button', async () => {
  I.click('(//button[contains(text(), "Delete")])[1]');
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

Then("I stay on the employee admin page", () => {
  I.amOnPage("/admin/employees/all");
});