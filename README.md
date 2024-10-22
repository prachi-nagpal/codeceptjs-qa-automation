# QA Functional Automation Tests

## <u>Test Framework : CodeceptJS using Selenium Webdriver</u>
- We have used **Codeceptjs framework** to write Automation tests that utilizes **Selenium Webdriver**. More info about codeceptjs here https://codecept.io/api/
- We have used Behaviour Driver Development (BDD) approach to writes test cases. More details here https://codecept.io/bdd/
- Programming Language : **Javascript**
- Build Automation Tool : **NPM (Nodejs Package Manager)**

### <u>Prerequsites</u>
- NodeJS (v17.3.0+)
- npm (v8.3.0+)

### <u>Installation</u>

- Open terminal & execute command 

    ```
    npm run build
    ```

- This command will install all the dependencies listed in **package.json** file located in the root directory as well as selenium standalone server required to run tests on the latest browser version.

- **Note** : Re-run this command whenever new dependency is added or there is change in dependency version or the local browser version is updated.

### <u>Execute Tests</u>

1. Post installation of all dependencies, open a new terminal tab & execute command to start selenium server

    ```
    npm run start:selenium
    ```
    
    This command will start selenium server on localhost at port 4444

2. Open new terminal tab, Execute tests via command

    ```
    npm run test:web -- --verbose
    ```
    
    This command will execute codeceptjs all tests/features in verbose mode.

3. Important environment variables to consider:
    - **ENV** : Target Test environment. Allowed Values : dev,staging,prod. Default : prod
    - **BROWSER** : Web Browser. Allowed Values : chrome,firefox. Default : chrome
    - **HEADLESS_MODE** : Run browser in headless mode. Allowed Values : true|false. Default : false

    Example : To execute tests for Prod environment in Firefox browser in headless mode

    ```
    ENV=prod BROWSER=firefox HEADLESS_MODE=true npm run test:web -- --verbose
    ```

4. To execute tests with specific tag, execute command 

    ```
    npm run test:web -- --grep '(?=.*@home) --verbose
    ```

### <u>Reporting (using Allure)</u>

- Allure Reporter is enabled to create the final Test Report. 
- In order to view the report in local browser, execute command:
    ```
    npm run report:web
    ```

### <u> Code setup </u>

Root directory comprises of following important files & folders:

- **package.json** : This file contains the functional attributes that npm uses to install dependencies & run scripts.
- **codecept** : This folder contains JS files where Codeceptjs Framework configurations are defined including Feature & Step file locations, PageObject files, Plugins, Helpers like REST, Webdriver, etc.
- **features** : This folder contains BDD feature files. Ex. features/home.feature*
- **steps** : This folder contains BDD step definition js files. Ex. steps/home.steps.js*
- **pages** : This folder contains page object js files. Ex. pages/home.page.js*
- **output** : This folder contains codeceptjs tests output xml files
- **config** : This folder contains environment specific json config files. Ex. config/prod.json
- **data** : This folder contains test data files in json format. Ex. config/content.json

## **<u> Bash Script Test Runner for CI/CD </u>**

To manage automated test execution efficiently, the following bash script is used:

```
#!/bin/bash

# See the usage section below for running tests

usage="
Usage: npm test -- [OPTIONS]

Required arguments:
    -P <Project>        Specify codecept project (e.g., web, etc.).
    -E <ENV>            Specify the target environment (dev, staging, prod).
    -B <BROWSER>        Specify the web browser (chrome, firefox).

Optional arguments:
    -T <Test Tag>       Run tests by specific tag (e.g., @home).
    -C <Json string>    Override configuration in JSON format.
    -D <Json string>    Override data in JSON format.
    -h                  Run tests in headless mode.
    -r                  Generate test report using Allure.
    -c                  Clean the CodeceptJS output folder.
    -s                  Skip the execution of tests.

Example #1: Run 'web' tests in prod for browser 'chrome' and tag '@timeline' and generate a report:

    npm test -- -P web -E prod -B chrome -T '(?=.*@timeline)' -r -h
"
```

### **Environment Variables & Configuration**

The script supports running tests with the following arguments:

- **Project (-P)**: Select the project type (e.g., `web`, `mobile-web`).
- **Environment (-E)**: Choose the environment (`dev`, `staging`, or `prod`).
- **Browser (-B)**: Choose the web browser (`chrome` or `firefox`).
- **Test Tag (-T)**: Optionally filter tests by tags (e.g., `@home`, `@timeline`).
- **Headless Mode (-h)**: Run tests in headless mode for faster execution.
- **Generate Report (-r)**: Generate an Allure report.
- **Clean Output (-c)**: Clean the test output directory before executing tests.

### Example Commands

1. **Run 'web' tests in prod for tag '@home'**:
    
    ```
    npm test -- -P web -E prod -T (?=.*@home) -r
    ```
    
2. **Run 'web' tests in 'firefox' browser in headless mode for production and generate reports**:
    
    ```
    npm test -- -P web -E prod -B firefox -h -r
    ```
    
3. **Skip tests and only clean the output folder for the 'web' project**:
    
    ```
    npm test -- -P web -c -s
    ```

## **<u>Test Cases covered</u>**

- Home Page (home.feature)
    - Open & validate Home page loaded
    - Validate header components including logo, nav menu bar, search icon, etc.
    - Validate footer components including markdown section, open links & newsletter section
    - Validate labels from test data files (json)
- Search Page (search.feature)
    - Open & validate Search Page loaded
    - Enter search keyword & execute
    - Verify search results are visible
    - Verify search keyword is present in each search result
- Contact Page (contact.feature)
    - Open & validate Contact page loaded
    - Submit contact enquiry using given details
- Timeline Page (timeline.feature)
    - Open & validate Timeline page loaded
    - Validate all timeline events using test data




