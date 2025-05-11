@mainSlider

Feature: MainSlider Creation by Admin

  Scenario: Admin creates a MainSlider
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    And I click "Login" button
    Then I wait 5 sec
    Then I click "Add new slider" button
    Then I go to the slider creation page
    When I enter form fields:
      | country | SPB |
    When I attach the file "images/image.jpeg" to the "input#image" input
    Then I click "Create slider" button
    Then I go to the home page

  Scenario: Admin edit one of MainSlider
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    And I click the "Login" button
    Then I navigate to the home page
    And I click the "SPB" span
    When I click the "Edit" link
    When I navigate to the edit page
    When I attach the new file "images/image.jpeg" to the "input#image" input
    Then I click "Save slider" button
    Then I go to the home page

  Scenario: Admin delete one of MainSlider
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    And I click the "Login" button
    Then I navigate to the home page
    And I click the "SPB" span
    And I click the "Delete" button
    Then I see the confirmation alert "Are you sure you want to delete this slider?"
    Then I confirm the deletion by clicking "ok" in the confirmation alert
    Then I stay on the home page

