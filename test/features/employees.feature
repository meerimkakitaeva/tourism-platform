@employees

Feature: Employees Creation by Admin
  Scenario: Admin creates a new employee
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    And I click "Login" button
    Then I go to the employee creation page
    When I enter employee form fields:
      | name | employee |
      | number | +996 700 800 800 |
      | role | moderator |
    When I attach the file "images/image.jpeg" to the "input#image" input
    Then I click "Create employee" button
    Then I go to the admin employee page

  Scenario: Admin edit one of employee
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    And I click the "Login" button
    Then I go to the admin employee page
    When I click the first "Edit" link
    When I navigate to the employee edit page
    When I attach the employee file "images/image.jpeg" to the "input#image" input
    Then I click "Save employee" button
    Then I go to the admin employee page

  Scenario: Admin delete one of employee
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    And I click the "Login" button
    Then I go to the admin employee page
    Then I wait 4 sec
    When I click the first "Delete" employee button
    Then I confirm the deletion by clicking "ok" in the confirmation alert
    Then I stay on the employee admin page