import assert from "assert";

const { I } = inject();

When("I click menu button", () => {
    I.wait(3);
    I.click(`//button/span[contains(text(), 'menu')]`);
});

When("I click edit profile button", () => {
    I.click(`//button[contains(@class, 'edit-profile page-profile_edit-btn')]`);
});
Then("I go to profile page", () => {
    I.amOnPage("/news/create");
    I.wait(2);
});

Then("the user menu should be visible", () => {
    I.wait(3);
    I.seeElement("//div[contains(@class, 'menu-active')]");
});
Then("I see the user's modal window.", () => {
    I.wait(3);
    I.seeElement("//div[contains(@class, 'editor-modal-open')]");
});

When("I enter new form fields:", (userData) => {
    userData.rows.forEach((row) => {
        const [fieldName, fieldValue] = row.cells;
        I.clearField(fieldName.value);
        I.fillField(fieldName.value, fieldValue.value);
    });
});

Then("I stay on my profile page", () => {
    I.amOnPage("/profile");
    I.wait(2);
});
