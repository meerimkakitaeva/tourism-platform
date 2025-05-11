@userLogin
Feature: Users
  We have sign in page.

  Scenario: User sign in
    Given I am on sign in page
    When I enter form fields:
      | username | user       |
      | password | qwerty1234 |
    And I click "Login" button
    Then I see "You have signed in!" in alert.

  Scenario: User sign in with incorrect data
    Given I am on sign in page
    When I enter form fields:
      | username | incorrectUser     |
      | password | incorrectPassword |
    And I click "Login" button
    Then I see "Wrong password or username!" in alert.