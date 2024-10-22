const { I } = inject();
const config = require("codeceptjs").config.get();

// Constants
const envConfig = config.envConfig;
const testData = config.testData["footer"];

module.exports = {

  // Locators
  locators: {
    section: "footer",
    markdown: {
      section: "footer .markdown-block",
      logo: "footer .markdown-block img"
    },
    socialLinks: {
      section: "#footerBlocksTop .socialaccountlinks-v2-block",
      list: "nav",
      fbLink: "a.facebook-unauth",
      twitterLink: "a.twitter-unauth",
      instaLink: "a.instagram-unauth",
      linkedinLink: "a.linkedin-unauth",
      youtubeLink: "a.youtube-unauth"
    },
    quickLinks: {
      section: "#footerBlocksTop>.row>.col:nth-child(3)",
    },
    newsletter: {
      section: "#footerBlocksTop>.row>.col:nth-child(4)",
      email: "input[type='email']",
      button: "button.newsletter-form-button"
    }
  },

  // Functions
  validateComponents() {
    // Check visibility
    I.waitForVisible(this.locators.section, 5);
    I.waitForVisible(this.locators.markdown.section, 5);
    I.waitForVisible(this.locators.markdown.logo, 5);
    I.waitForVisible(this.locators.socialLinks.section, 5);
    within(this.locators.socialLinks.section, () => {
      I.waitForVisible(this.locators.socialLinks.list);
      I.waitForClickable(this.locators.socialLinks.fbLink);
      I.waitForClickable(this.locators.socialLinks.twitterLink);
      I.waitForClickable(this.locators.socialLinks.instaLink);
      I.waitForClickable(this.locators.socialLinks.linkedinLink);
      I.waitForClickable(this.locators.socialLinks.youtubeLink);
    });
    I.waitForVisible(this.locators.quickLinks.section, 5);
    I.waitForVisible(this.locators.newsletter.section, 5);
    within(this.locators.newsletter.section, () => {
      I.waitForEnabled(this.locators.newsletter.email, 5);
      I.waitForClickable(this.locators.newsletter.button, 5);
      I.waitForText(testData.newsletter.buttonLabel, 2, this.locators.newsletter.button);
    });
    // Match Data
    I.waitForText(testData.copywriteText, 2, this.locators.markdown.section);
    I.waitForText(testData.quickLinks.heading, 2, this.locators.quickLinks.section);
    I.waitForText(testData.newsletter.heading, 2, this.locators.newsletter.section);
  },

};