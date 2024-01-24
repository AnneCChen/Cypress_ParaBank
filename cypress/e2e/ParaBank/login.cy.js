//Login the user created in regestiration

describe('Login Tests', () => {
    beforeEach(() => {
        // Call the login custom command before running the tests
        cy.login();
      });



    it('Should login with the user created in step 2', () => {
    // Assertion: Check if the login is successful and the user is redirected to the home page
      cy.url().should('include', '/overview.htm');
    });


    it('Should verify if the global navigation menu works as expected', () => {
        const menuItems = ["Open New Account", "Accounts Overview", "Transfer Funds", "Bill Pay", "Find Transactions", "Update Contact Info", "Request Loan", "Log Out"];
        menuItems.forEach((menuItem) => {
        cy.get('li').contains(menuItem).should('exist');
      });
     });

 });
  