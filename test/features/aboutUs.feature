@aboutUs

Feature:
  Scenario: Edit about us page
    Given I am on sign in page
    When I enter form fields:
      | username | admin      |
      | password | qwerty1234 |
    And I click "Login" button
    Then I wait 3 sec
    When I click "About Us" link
    Then I wait 3 sec
    Then I go to the about us page
    Then I wait 3 sec
    When I click "main" edit button
    Then I wait 3 sec
    Then I see edit modal window
    Then I wait 3 sec
    When I enter new form fields:
      | title | About us |
      | description |  Experience Kyrgyzstan with curated tours and passionate guides. Your adventure begins here.  |
    Then I click the save button edit about us
    Then I wait 3 sec
    Then I see "Experience Kyrgyzstan with curated tours and passionate guides. Your adventure begins here." text
    Then I wait 3 sec
    When I click "offer" edit button
    Then I wait 3 sec
    Then I see edit modal window
    Then I wait 3 sec
    When I enter new form fields:
      | title | Seamless Exploration: Book Your Ideal Adventure from 450+ Unforgettable Tours |
    Then I click the save button edit about us
    Then I wait 3 sec
    Then I see "Seamless Exploration: Book Your Ideal Adventure from 450+ Unforgettable Tours" text
    Then I wait 3 sec
    When I click the first post edit button on the about us page
    Then I wait 3 sec
    When I enter new form fields:
      | description | Save Big on Unforgettable Journeys. Affordable adventures, unbeatable prices. |
    Then I click the save button edit about us
    Then I wait 3 sec
    Then I see "Save Big on Unforgettable Journeys. Affordable adventures, unbeatable prices." text
    Then I wait 3 sec
    When I click "review" edit button
    Then I wait 3 sec
    Then I see edit modal window
    Then I wait 3 sec
    When I enter new form fields:
      | description |  Client Testimonials: Saving money with unforgettable experiences. Read what our clients have to say.  |
    Then I wait 3 sec
    Then I click the save button edit about us
    Then I wait 3 sec
    Then I see "Client Testimonials: Saving money with unforgettable experiences. Read what our clients have to say." text