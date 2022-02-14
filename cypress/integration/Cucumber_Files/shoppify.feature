Feature: Shoppify ORder Feature 

Scenario: Good buyer places a simple order on shopify store
    Given I am a GOODBUYER
    When I add some items to the cart
    And As the ‘goodbuyer’ I place order using a credit card, to create an Order ORDER1
    Then System should have ORDER1 transaction data
   

    Scenario: Opening DevShoppify
    Given Go to Login
    #When Paste variable here
