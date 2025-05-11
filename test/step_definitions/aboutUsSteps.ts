import assert from "assert";

const { I } = inject();

When('I click the first post edit button on the about us page', async () => {
    I.click('//div[@class="about-page-advantages-card"][1]');
    I.click("(//button[@class='about-page-edit-btn' and @name='posts'])[1]");
    I.wait(2);
});
When("I click {string} edit button", (text: string) => {
    I.click(`//button[@class="about-page-edit-btn" and @name='${text}']`);
    I.wait(2);
});
//*[@id="__next"]/header/div[1]/div[1]/span/img
When("I change language to EN", (text: string) => {
    I.click(`//*[@id="__next"]/header/div[1]/div[1]/span/img`);
    I.wait(2);
    I.click(`//img[@src="/_next/image?url=http%3A%2F%2Flocalhost%3A8000%2Ffixtures%2Fen.jpg&w=96&q=75"]`);
    I.wait(4);
});

When("I enter new form fields:", (userData) => {
    userData.rows.forEach((row) => {
        const [fieldName, fieldValue] = row.cells;
        I.clearField(fieldName.value);
        I.fillField(fieldName.value, fieldValue.value);
    });
});

When("I click the save button edit about us", () => {
    I.click(`//button[@class="about-page-edit-modal-btn" and contains(text(), "Save")]`);
});


When("I see edit modal window", () => {
    I.wait(2);
    I.seeElement("//form[contains(@class, 'about-page-edit-modal')]");
});

Then("I see {string} text", (text: string) => {
   I.see(text);
});


