const { I } = inject();
const config = require("codeceptjs").config.get();

// Constants
const envConfig = config.envConfig;
const testData = config.testData["contact"];

module.exports = {

  // Locators
  locators: {
    pageTitle: "pagetitle",
    officeNames: "h2",
    office: "(//h2)[IDX]/..",
    enquiry: {
      form: "form.react-form-contents",
      fNameInput: "input[name='fname']",
      lNameInput: "input[name='lname']",
      emailInput: "form.react-form-contents input[type='email']",
      purposeSection: ".form-item.radio",
      purposeRadioInput: "//span[@class='radio-label'][text()='PURPOSE']",
      commentsInput: "form.react-form-contents textarea",
      submitBtn: "form.react-form-contents button[type='submit']",
      error: {
        list: ".form-field-error"
      }
    },
    successText: ".form-block .form-submission-text",
  },

  // Functions
  validatePageLoaded() {
    I.waitInUrl(envConfig.contact.path, 5);
    // Check visibility
    I.waitForVisible(this.locators.pageTitle, 5);
    I.waitForVisible(this.locators.officeNames, 5);
    I.waitForVisible(this.locators.enquiry.form, 5);
    I.waitForVisible(this.locators.enquiry.fNameInput, 5);
    I.waitForVisible(this.locators.enquiry.lNameInput, 5);
    I.waitForVisible(this.locators.enquiry.emailInput, 5);
    I.waitForVisible(this.locators.enquiry.purposeSection, 5);
    I.waitForVisible(this.locators.enquiry.commentsInput, 5);
    I.waitForVisible(this.locators.enquiry.submitBtn, 5);
    I.waitForText("GO", 2, this.locators.enquiry.submitBtn);
    // Match data
    const title = testData.heading;
    I.waitForText(title, 5, this.locators.pageTitle);
    const officeLocations = testData.officeLocations;
    for (let index = 1; index <= officeLocations.length; index++) {
      const officeLocation = officeLocations[index-1];
      const officeLocator = this.locators.office.replace("IDX", index);
      I.waitForText(officeLocation.name, 2, officeLocator);
      I.waitForText(officeLocation.address, 2, officeLocator);
      I.waitForText(officeLocation.phone, 2, officeLocator);
    }
  },

  submitEnquiry(details) {
    I.waitForVisible(this.locators.enquiry.form, 5);
    I.fillField(this.locators.enquiry.fNameInput, details["first_name"]);
    I.fillField(this.locators.enquiry.lNameInput, details["last_name"]);
    I.fillField(this.locators.enquiry.emailInput, details["email"]);
    I.click(this.locators.enquiry.purposeRadioInput.replace("PURPOSE", details["purpose"]));
    I.fillField(this.locators.enquiry.commentsInput, details["comments"]);
    I.click(this.locators.enquiry.submitBtn);
    I.waitForText("SUBMITTING", 2, this.locators.enquiry.submitBtn);
  },

  verifyEnquiryFailedDuetoCaptcha() {
    I.waitForVisible(this.locators.enquiry.error.list, 10);
    I.waitForText(testData.captchaErrorMessage, 10, this.locators.enquiry.form);
  }

};