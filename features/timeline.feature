@timeline
Feature: Automate About Timeline Page

    As a user
    I should be able to open timeline page

    Scenario: Open & Validate Timeline Page
        Given I am on home page
        When I navigate to "About" menu and "Timeline 2001-2023" sub-menu
        Then I validate timeline page is loaded
        And I validate timeline events

    