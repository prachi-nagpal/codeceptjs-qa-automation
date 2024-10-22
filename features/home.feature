@home
Feature: Automate Home Page

    As a user
    I should be able to open home page

    Scenario: Open Home Page and validate header & footer components
        Given I am on home page
        And I validate home page is loaded
        Then I validate header components
        And I validate footer components


