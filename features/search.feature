@search
Feature: Automate Search Page

    As a user
    I should be able to open search page
    and verify search results

    Scenario: Open & Validate Search Page
        Given I am on home page
        When I click on search menu
        Then I validate search page is loaded
        And I enter search keyword "study"
        And I validate search results matching keyword "study"

    