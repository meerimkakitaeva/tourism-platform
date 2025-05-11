import assert from "assert";

const { I } = inject();

When("I'm looking for the right application and accept application", async () => {
    let partnerCards = await I.grabNumberOfVisibleElements("//div[@class='guide-card']");

    for (let i = 1; i <= partnerCards; i++) {
        let name = await I.grabTextFrom(`(//div[@class='guide-card'])[${i}]//h2`);
        if (name === 'Ak-Maral') {
            I.click(`(//div[@class='guide-card'])[${i}]//button[contains(text(), 'Accept')]`);
            break;
        }
    }
});

Then("I see {string} element", (text: string) => {
    I.click(`//div[contains(text(), '${text}')]`);
});
