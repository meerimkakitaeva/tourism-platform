import { setHeadlessWhen, setCommonPlugins } from "@codeceptjs/configure";
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: "./*_test.ts",
  output: "./output",
  helpers: {
    Puppeteer: {
      url: "http://localhost:3000",
      show: !process.env.CI,
      windowSize: "1200x900",
    },
  },
  include: {
    I: "./steps_file",
  },
  gherkin: {
    features: "./features/*feature",
    steps: [
      "./step_definitions/mainSliderSteps.ts",
      "./step_definitions/registrationSteps.ts",
      "./step_definitions/signInSteps.ts",
      "./step_definitions/newsSteps.ts",
      "./step_definitions/partnersSteps.ts",
      "./step_definitions/newsSteps.ts",
      "./step_definitions/navMenuSteps.ts",
      "./step_definitions/toursSteps.ts",
      "./step_definitions/newsSteps.ts",
      "./step_definitions/logoutSteps.ts",
      "./step_definitions/newsSteps.ts",
      "./step_definitions/employeesSteps.ts",
      "./step_definitions/contactUsSteps.ts",
      "./step_definitions/employeesSteps.ts",
      "./step_definitions/aboutUsSteps.ts",
      "./step_definitions/toursOrderSteps.ts",
      "./step_definitions/partnersApplicationSteps.ts",
      "./step_definitions/adminPageSteps.ts",
      "./step_definitions/guidesSteps.ts",
    ],
  },
  name: "test",
};
