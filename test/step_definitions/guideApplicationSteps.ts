import assert from "assert";

const { I } = inject();

Then("I accept for the right guide application", async () => {
    let guideCards = await I.grabNumberOfVisibleElements("//div[@class='guide-card']");
    for (let i = 1; i <= guideCards; i++) {
        let name = await I.grabTextFrom(`(//div[@class='guide-card'])[${i}]//h3`);
        if (name === 'Rob Stark') {
            I.click(`(//div[@class='guide-card'])[${i}]//a[contains(text(), 'Accept')]`);
            break;
        }
    }
});
When("I enter languages",() => {
    const languages = ['Russian', 'Kyrgyz', 'English'];
    for (const language of languages) {
        I.fillField('input[name="languages"]', language);
        I.click('//button[contains(text(), "Add")]');
        I.wait(1);
    }
});

When("I wait {int} sec", (number: number) => {
    I.wait(number);
});

