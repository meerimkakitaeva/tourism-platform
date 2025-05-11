import assert from "assert";

const { I } = inject();


When("I click contact us edit button", () => {
    I.click(`//button[@class="icon-container-edit-contacts" and @name='main']`);
    I.wait(2);
});

When("I click the 'Save' button in the 'Edit Contact Us' section.", () => {
    I.click(`//button[@name="contacts-title-edit-btn" and contains(text(), "Save")]`);
    I.wait(2);
});
When('I click the first info edit button on the contact us page', async () => {
    I.click('//div[@class="contacts-card"][1]');
    I.wait(2);
});

When('I click add contact info button', async () => {
    I.click('//div[@class="add-info" and contains(text(), "+")]');
    I.wait(2);
});

Then("I see creation's modal window", () => {
    I.wait(3);
    I.seeElement("//div[contains(@class, 'editor-modal-open')]");
});


When("I click delete contacts info button", () => {
    I.click(`//button[@name="delete-contact-info" and contains(text(), "delete")]`);
    I.wait(2);
});
