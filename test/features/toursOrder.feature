@toursOrder

Feature: Tours Order by User

  Scenario: Anonymous user orders tour
    Given I am on home page
    Given I click the "1" tour
    Then I navigate to the one tour page
    When I click the select
    When I choose date
    When I enter tour form email field:
      | email | user@gmail.com |
    When I enter tour form tel field:
      | tel | +996 700 000 000 |
    Then I click book button
    Then I go back to the home page

  Scenario: Authorized user orders tour
    Given I am on sign in page
    When I enter form fields:
      | username | user |
      | password | qwerty1234 |
    And I click the "Login" button
    When I click the "1" tour
    Then I navigate to the one tour page
    When I click the select
    When I choose date
    Then I click book button
    Then I go back to the home page