@userRegistration

Feature: Users Registration
  We have a sign up page.

  Scenario: Successful user registration
    Given I am on the registration page
    When I enter registration form fields:
      | username    | jain                 |
      | password    | qwerty1234           |
      | email       | new_user@example.com |
      | displayName | NewUser              |
    And I click "Sign up" button
    Then I see "You have signed in!" in alert.

  Scenario: Registration with existing username
    Given I am on the registration page
    When I enter registration form fields:
      | username    | jain                 |
      | password    | qwerty1234           |
      | email       | new_user@example.com |
      | displayName | NewUser              |
    And I click "Sign up" button
    Then I see "Something is wrong!" in alert.

  Scenario: Registration with missing required fields
    Given I am on the registration page
    When I enter registration form fields:
      | username    |  |
      | password    |  |
      | email       |  |
      | displayName |  |
    And I click "Sign up" button
    Then I should stay on the registration page