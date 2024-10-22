const { footerPage } = inject();

Then('I validate footer components', () => {
    footerPage.validateComponents();
});