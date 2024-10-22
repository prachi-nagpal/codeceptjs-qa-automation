const { I } = inject();
const config = require("codeceptjs").config.get();

// Constants
const envConfig = config.envConfig;

module.exports = {

  // Locators
  locators: {
    section: ".sqs-search-page-content",
    input: {
      section: ".sqs-search-page-input",
      textField: ".sqs-search-page-input input",
      loader: ".sqs-search-page-input .spinner-wrapper"
    },
    output: {
      section: ".sqs-search-page-output",
      results: {
        section: ".sqs-search-page-result .search-results",
        items: ".sqs-search-page-result .search-result",
        item: ".sqs-search-page-result .search-result:nth-child(IDX)",
        title: ".sqs-title",
        content: ".sqs-content",
      },
      moreResultsBtn: ".sqs-search-page-more"
    }
  },

  // Functions
  validatePageLoaded() {
    I.waitInUrl(envConfig.search.path, 5);
    // Check visibility
    I.waitForVisible(this.locators.section, 5);
    I.waitForVisible(this.locators.input.section, 5);
    I.waitForVisible(this.locators.input.textField, 5);
    I.seeInField(this.locators.input.textField, "");
    I.waitForVisible(this.locators.output.section, 5);
  },

  performSearch(keyword){
    I.assertLengthAboveThan(keyword, 0);
    I.waitForEnabled(this.locators.input.textField, 5);
    I.clearField(this.locators.input.textField);
    // Enter Search Keyword
    I.fillField(this.locators.input.textField, keyword);
    // Verify search results are visible in few seconds
    I.waitForVisible(this.locators.input.loader, 5);
    I.waitForInvisible(this.locators.input.loader, 10);
    I.waitForVisible(this.locators.output.results.section, 10);
    I.waitForVisible(this.locators.output.results.items, 10);
    I.waitForVisible(this.locators.output.moreResultsBtn, 10);
    I.waitForClickable(this.locators.output.moreResultsBtn, 10);
    I.waitForText("SEE MORE", 2, this.locators.output.moreResultsBtn);
  },

  async validateSearchResults(keyword) {
    I.assertLengthAboveThan(keyword, 0);
    keyword = keyword.toLowerCase();
    I.waitForVisible(this.locators.output.results.items, 10);
    I.seeInField(this.locators.input.textField, keyword);
    const numResults = await I.grabNumberOfVisibleElements(this.locators.output.results.items);
    for (let index = 1; index <= numResults; index++) {
      const resultItemLocator = this.locators.output.results.item.replace("IDX", index);
      I.scrollTo(resultItemLocator);
      await within(resultItemLocator, async () => {
        const title = await I.grabTextFrom(this.locators.output.results.title);
        const content = await I.grabTextFrom(this.locators.output.results.content);
        if(title.toLowerCase().includes(keyword)) {
          I.say(`Title(${title}) contains keyword(${keyword})`);
        }
        else if(content.toLowerCase().includes(keyword)) {
          I.say(`Content(${content}) contains keyword(${keyword})`);
        }
        else {
          I.assertTrue(false, `Fail!! None of the Title(${title}) or Content(${content}) contains keyword(${keyword})`);
        }
      })
    }
  },
};