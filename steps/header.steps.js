const { headerPage } = inject();

Then('I validate header components', () => {
    headerPage.validateComponents();
});

Then('I navigate to {string} menu and {string} sub-menu', (menu, subMenu) => {
    headerPage.navigateToMenu(menu, subMenu);
});

Then('I navigate to {string} menu', (menu) => {
    headerPage.navigateToMenu(menu);
});

Then('I click on search menu', () => {
    headerPage.clickSearchMenu();
});