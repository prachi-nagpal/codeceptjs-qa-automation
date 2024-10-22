const { I } = inject();
const context = require("codeceptjs").config.get();

// Constants
const config = context.envConfig;
const testData = context.testData["home"];

module.exports = {

  // Locators
  locators: {
    header: {
      section: "header.Header--bottom",
      logo: "a.Header-branding"
    },
    footer: {
      section: "footer.Footer"
    }
  },

  // Functions
  navigate() {
    I.amOnPage("/");
  },
  
  validatePageLoaded() {
    // Check visibility
    I.waitUrlEquals(config.domain, 5);
    I.waitForVisible(this.locators.header.section, 10);
    I.waitForVisible(this.locators.footer.section, 10);
    I.waitForVisible(this.locators.header.logo, 5);
    I.waitForClickable(this.locators.header.logo, 5);
    // Match Data
    I.seeTitleEquals(testData.title);
  }

};