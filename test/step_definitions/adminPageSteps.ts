import assert from "assert";

const { I } = inject();

Then("I go to the prev page", () => {
    I.executeScript("window.history.back();");
    I.wait(2);
});

When("I click {string} admin link btn", (text: string) => {
    I.click(`//a[contains(@class, 'btn-create-tour') and text()='${text}']`);
});

When("I click {string} admin link", (text: string) => {
    I.click(`//h1[text()='${text}']`);
});
Then("I wait {int} sec", (number: number) => {
    I.wait(number);
});