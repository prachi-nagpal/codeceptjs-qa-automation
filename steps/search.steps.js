const { searchPage } = inject();

Then('I validate search page is loaded', () => {
    searchPage.validatePageLoaded();
});

Then('I enter search keyword {string}', (keyword) => {
    searchPage.performSearch(keyword);
});

Then('I validate search results matching keyword {string}', async (keyword) => {
    await searchPage.validateSearchResults(keyword);
});