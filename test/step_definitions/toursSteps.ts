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

Then("I go to the tours creation page", () => {
  I.amOnPage("/tours/create");
  I.wait(2);
});

When("I enter tours form fields:", (formData) => {
  formData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});

When(
  "I attach the tours file {string} to the {string} input",
  (filePath, inputSelector) => {
    I.waitForElement(inputSelector);
    I.attachFile(inputSelector, filePath);
  },
);

Then("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I go to the home page", () => {
  I.amOnPage("/");
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

Then("I go to the admin tours page", () => {
  I.amOnPage("/admin/tours/1");
  I.wait(2);
});

When("I click the {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
  I.wait(5);
});

When('I click the first "Edit" link', async () => {
  I.click('//a[contains(text(), "Edit")][1]');
  I.wait(5);
});

When(
  "I attach the new file {string} to the {string} input",
  (filePath, inputSelector) => {
    I.attachFile(inputSelector, filePath);
    I.wait(1);
  },
);

When("I navigate to the tours edit page", async () => {
  const currentUrl = await I.grabCurrentUrl();

  const parts = currentUrl.split("/");
  const id = parts[parts.length - 1];
  I.amOnPage(`/tours/edit/${id}`);
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

Then("I go to the admin tours page", () => {
  I.amOnPage("/admin/tours/1");
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

Then("I go to the admin tours page", () => {
  I.amOnPage("/admin/tours/1");
  I.wait(5);
});
When("I click the {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
  I.wait(5);
});
When('I click the first "Delete" button', async () => {
  I.click('//button[contains(text(), "Delete")][1]');
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

Then("I stay on the tours admin page", () => {
  I.amOnPage("/admin/tours/1");
  I.wait(2);
});

Then("I go to the prev page", () => {
  I.executeScript("window.history.back();");
  I.wait(2);
});

When("I'm on the page of one tour", async () => {
  I.wait(4);
  I.click('//button[@name="information"]');
  const title = await I.grabTextFrom('//h2[@class="one-tour-top-title"]');
  I.see(title);
  I.wait(1);
});

When('I click the {string} tour', (number: string) => {
  I.click(`(//div[@class="tour-item"])[${number}]`);
  I.wait(5);
});

When("I check tour plan", async () => {
  I.click('//button[@name="plan"]');
  I.click(`(//div[@class="plan-day"])[1]`);
  I.wait(1);
});

When("I check tour location", async () => {
  I.click('//button[@name="location"]');
  I.wait(3);
});

When("I check tour gallery", async () => {
  I.click('//button[@name="gallery"]');
  let numberOfPhotos = await I.grabNumberOfVisibleElements(`//div[@class="one-tour-photo"]`);
  if (numberOfPhotos > 0) {
    I.click(`(//div[@class="one-tour-photo"])[1]`);
    I.wait(5);
    I.click("//div[@class='backdrop-gallery-btn']");
    I.wait(1);
  }
});

When("I check tour reviews", async () => {
  I.click('//button[@name="reviews"]');
  I.wait(4);
  I.seeElement("//div[@class='one-tour-reviews']")
});