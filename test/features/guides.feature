 @guides

Feature: Guides CRUD
  Scenario: User sends a new guide request
    Given I am on sign in page
    When I enter form fields:
      | username | user |
      | password | qwerty1234 |
    And I click "Login" button
    Then I wait 4 sec
    Then I go to the guide request page
    When I enter request form fields:
      | name | Alex |
      | surname | Folk |
      | number | +996 700 800 800 |
      | message | guide |
    Then I click "Send" button
    Then I go to the home page

  Scenario: Admin creates new guide
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    And I click "Login" button
    Then I go to the guides order page
    When I click the first "Accept" link
    Then I go to the guide creation page
    When I enter guides form fields:
      | languages | english |
      | country | Kyrgyzstan |
      | description | new guide |
    When I attach the guide file "images/image.jpeg" to the "input#image" input
    When I click "Add" button
    Then I click "Send" button
    Then I go back to the guides order page

  Scenario: Admin deletes guide
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    And I click "Login" button
    Then I go to the guides page
    When I click the first "Delete" button
    Then I see the confirmation alert "Are you sure you want to delete this guide?"
    Then I confirm the deletion by clicking "ok" in the confirmation alert
    Then I stay at the guides page
