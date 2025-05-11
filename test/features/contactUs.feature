@contactUs

Feature: Edit contacts us information
  Scenario: Edit contacts us information
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    And I click "Login" button
    When I click "Contact Us" link
    Then I go to the contact us page
    When I click contact us edit button
    Then I see the user's modal window.
    When I enter new form fields:
      | title | Contacts |
      | description | Here are our contacts, choose one that is convenient for you and contact us. |
    When I attach the file "images/image.jpeg" to the "input#image" input
    Then I click the 'Save' button in the 'Edit Contact Us' section.
    When I click the first info edit button on the contact us page
    Then I see the user's modal window.
    When I enter new form fields:
      | country | Bishkek |
      | address | Baytik-Batyra 64 |
      | phone   | +996 705 992 962 |
    Then I click the 'Save' button in the 'Edit Contact Us' section.
    When I click the first info edit button on the contact us page
    Then I see the user's modal window.
    When I click delete contacts info button
    Then I wait 5 sec
    Then I click add contact info button
    Then I see creation's modal window
    When I enter form fields:
      | country | Bishkek |
      | address | Baytik-Batyra 64 |
      | phone   | +996 705 992 962 |
    Then I click the 'Save' button in the 'Edit Contact Us' section.



