Feature: Get Greeting Feature
	As an API user
	I want to get greetings

	Scenario: User should be addressed 
		When I make a hello request
		Then I should the greetings

	Scenario: User should be notified of non-existing resource 
		When I request a non-existing API resource
		Then I should see a resource not found response	
	
