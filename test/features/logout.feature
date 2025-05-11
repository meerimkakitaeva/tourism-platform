@userLogout

Feature: Users logout and editing
  Scenario: Users Logout
    Given I am on sign in page
    When I enter form fields:
      | username | user       |
      | password | qwerty1234 |
    When I click "Login" button
    When I click menu button
    Then the user menu should be visible
    When I click "Logout" button
    Then I see "You have logged out!" in alert.


  Scenario: Editing a user via a modal window
    Given I am on sign in page
    When I enter form fields:
      | username | user       |
      | password | qwerty1234 |
    When I click "Login" button
    When I click menu button
    Then the user menu should be visible
    When I click "Edit profile" button
    Then I see the user's modal window.
    When I enter new form fields:
      | displayName | Christian |
      | email | chris@gmail.com |
    Then I click "Save" button

  Scenario: Editing a user via the profile page
    Given I am on sign in page
    When I enter form fields:
      | username | user       |
      | password | qwerty1234 |
    When I click "Login" button
    And I wait 2 sec
    Then I go to profile page
    When I click edit profile button
    Then I wait 2 sec
    Then I see the user's modal window.
    When I enter new form fields:
      | displayName | John |
      | email | john@gmail.com |
    Then I click "Save" button
    Then I stay on my profile page

