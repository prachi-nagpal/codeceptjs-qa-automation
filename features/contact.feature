@contact
Feature: Automate Contact Page

    As a user
    I should be able to open contact page
    and submit enquiry

    @Invalid
    Scenario: Open & Validate Contact Page
        Given I am on home page
        When I navigate to "Get In Touch" menu
        Then I validate contact page is loaded
        And I submit contact enquiry details
        | first_name | prachi |
        | last_name | nagpal |
        | email | abc123@gmail.com |
        | purpose | Say hello and well done! |
        | comments | Automation Test |
        And I verify contact enquiry failed for captcha

    