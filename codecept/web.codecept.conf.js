const { loadConfig, loadData } = require("../utils.js");

const env = process.env.ENV ? process.env.ENV.toLowerCase() : "prod";
const browser = process.env.BROWSER ? process.env.BROWSER.toLowerCase() : "chrome";
const overrideConfig = process.env.OVERRIDE_CONFIG;
const overrideData = process.env.OVERRIDE_DATA;

// Load json config file for specific env & locale
const envConfig = loadConfig(`${env}.json`, overrideConfig);
// Load all json data files with locale specific content
const testData = loadData(overrideData);

const chromeArgs = [];
const firefoxArgs = [];
if (process.env.HEADLESS_MODE && process.env.HEADLESS_MODE.toUpperCase() === "TRUE") {
  chromeArgs.push("--headless", "--disable-gpu", "--no-sandbox");
  firefoxArgs.push("-headless");
}

exports.config = {
  output:   '../output/web',
  helpers: {
    WebDriver: {
      url: envConfig.domain,
      browser: browser,
      host: "127.0.0.1",
      port: 4444,
      windowSize: "maximize",
      waitForTimeout: 20000,
      smartWait: 5000,
      restart: true,
      desiredCapabilities: {
        chromeOptions: {
          args: chromeArgs,
        },
        firefoxOptions: {
          args: firefoxArgs,
        },
      },
    },
    ChaiWrapper: {
      require: 'codeceptjs-chai',
    },
  },
  gherkin:   {
    features: '../features/*.feature',
    steps:    '../steps/*.steps.js',
  },
  include : {
    homePage: "../pages/home.page.js",
    timelinePage: "../pages/timeline.page.js",
    headerPage: "../pages/header.page.js",
    footerPage: "../pages/footer.page.js",
    searchPage: "../pages/search.page.js",
    contactPage: "../pages/contact.page.js",
  },
  plugins: {
    screenshotOnFail: {
      enabled: true,
    },
    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy'
    },
    tryTo: {enabled: true}
  },
  name: 'Codeceptjs Web Automated Tests',
  env,
  envConfig,
  testData
};
