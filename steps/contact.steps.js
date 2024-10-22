const { contactPage } = inject();

Then('I validate contact page is loaded', () => {
    contactPage.validatePageLoaded();
});

Then('I submit contact enquiry details', (table) => {
    contactPage.submitEnquiry(table.parse().rowsHash());
});

Then('I verify contact enquiry failed for captcha', () => {
    contactPage.verifyEnquiryFailedDuetoCaptcha();
});