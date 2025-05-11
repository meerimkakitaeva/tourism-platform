@toursPage

Feature: Tours Features

  Scenario: Switch to different tours
    Given I am on home page
    When I click "Tours" link
    Then I go to the tours page
    When I click the "1" tour
    When I'm on the page of one tour
    When I check tour plan
    When I check tour location
    When I check tour gallery
    When I check tour reviews
    Then I go to the prev page
    When I click the "2" tour
    When I'm on the page of one tour
    When I check tour plan
    When I check tour location
    When I check tour gallery
    When I check tour reviews


  Scenario: Admin creates a tours
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    When I click "Login" button
    Then I go to the home page
    Then I go to the tours creation page
    When I enter tours form fields:
      | name        | Test tour             |
      | guide       | Guide                 |
      | country     | Kyrgyzstan            |
      | duration    | 10                    |
      | price       | 10000                 |
      | description | Test tour description |
      | destination | Test tour destination |
      | arrival     | Test tour arrival     |
      | departure   | Test tour departure   |
      | dressCode   | Test tour dressCode   |
    When I attach the tours file "images/image.jpeg" to the "input#mainImage" input
    Then I click "Create Tour" button
    Then I go to the home page

  Scenario: Admin edit one of tours
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    And I click the "Login" button
    Then I go to the admin tours page
    And I click the "published" button
    When I click the first "Edit" link
    When I navigate to the tours edit page
    When I attach the new file "images/image.jpeg" to the "input#mainImage" input
    Then I click "Save Tour" button
    Then I go to the home page

  Scenario: Admin delete one of tours
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    And I click the "Login" button
    Then I go to the admin tours page
    And I click the "non published" button
    When I click the first "Delete" button
    Then I see the confirmation alert "Are you sure you want to delete this tour?"
    Then I confirm the deletion by clicking "ok" in the confirmation alert
    Then I stay on the tours admin page
