const { homePage } = inject();

Given('I am on home page', () => {
    homePage.navigate();
});

Then('I validate home page is loaded', () => {
    homePage.validatePageLoaded();
});