@adminPage

Feature: Admin page links
  Scenario: Admin page links
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    When I click "Login" button
    Then I wait 3 sec
    When I click "Admin Page" link
    Then I wait 3 sec
    When I click "Create tour" admin link btn
    Then I wait 4 sec
    Then I go to the prev page
    Then I wait 4 sec
    When I click "Tours" admin link
    Then I wait 4 sec
    Then I go to the prev page
    Then I wait 4 sec
    When I click "Guides" admin link
    Then I wait 4 sec
    Then I go to the prev page
    Then I wait 4 sec
    When I click "News" admin link
    Then I wait 4 sec
    Then I go to the prev page
    Then I wait 4 sec
    When I click "Users" admin link
    Then I wait 3 sec
    When I click "Admin Page" link
    Then I wait 3 sec
    When I click "Partners" admin link
    Then I wait 3 sec
    When I click "Admin Page" link
    Then I wait 3 sec
    When I click "Partner orders" admin link
    Then I wait 3 sec
    When I click "Admin Page" link
    Then I wait 3 sec
    When I click "Employees" admin link
    Then I wait 3 sec
    When I click "Admin Page" link
    Then I wait 3 sec
    When I click "Guide orders" admin link