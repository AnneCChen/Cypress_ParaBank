//account creation and transaction test cases

describe('Savings Account Tests', () => {
//login and visi 
    beforeEach(() => {
        // Call the login custom command before running the tests
        cy.login();
        cy.visit('/overview.htm');

      });



it('Should create a Savings account and validate balance details', () => {
      
        // Create a new saving 
        
        cy.get('a[href="/parabank/openaccount.htm"]').click();
        cy.get('select#type').select('SAVINGS');
        cy.get('input.button[value="Open New Account"]').click();
        cy.get('h1.title').should('include.text', 'Account Opened!');
        cy.get('a#newAccountId').invoke('text').then(($text) => {
            const newAccID = $text.trim(); 
            cy.log('newAccID:', newAccID);   
            Cypress.env('NewAcc',newAccID)
  /*          cy.writeFile('cypress/fixtures/acc.json',{
            NewAcc: newAccID,
   });*/
        });
    });



    
//Validate if Accounts overview page is displaying the balance details as expected.)

it('Should display balance details as expected', () => {
    //Assert that the balance element exists
    cy.get('h1.title:contains("Accounts Overview")').should('exist');
})
        

//check the balance
it('totle balance should be the same with totle number', () => {
    cy.wait(3000)
    let sum = 0;

    cy.get('#accountTable tbody tr').each(($row) => {
      const valueInSecondColumn = parseFloat($row.find('td:nth-child(2)').text().trim());
      if (!isNaN(valueInSecondColumn)) {
        sum += valueInSecondColumn;
      }
    }).then(() => {
        cy.wrap(sum).should('eq', 0);

});



// Transfer funds from account created in step 5 to another account.
it('Should transfer funds from one account to another', () => {
    
    // Get the 1st created account id from json
    cy.fixture('acc').then((data)=>{
        const fromAcc = data.OriAccID
        cy.log(fromAcc)

        // Navigate to the transfer funds page
        cy.get('a[href="/parabank/transfer.htm"]').click();

        // Navigate to the transfer funds page
        cy.get('a[href="/parabank/transfer.htm"]').click();
        cy.get('#amount').type('50'); 

       
        cy.get('select#toAccountId').find('option:eq(1)').invoke('attr', 'selected', 'selected').trigger('change', { force: true });
        cy.get('input.button[value="Transfer"]').click();
        cy.contains("Transfer Complete!")

        });

             

    });
});

//pay the bill 
it('Should pay the bill with the account created in step 5', () => {

    cy.fixture('acc.json').then(($data)=>{
    const testAcc = $data.NewAcc;
    // const password = data.Pwd;
    cy.log(testAcc);
    //cy.log(password);
    cy.visit('/index.htm');
    cy.get('a[href="/parabank/billpay.htm"]').click();
    // Test input
    cy.get('input[name="payee.name"]').type('David Jones');
    cy.get('input[name="payee.address.street"]').type('123 Main Street');
    cy.get('input[name="payee.address.city"]').type('Mel');
    cy.get('input[name="payee.address.state"]').type('VIC');
    cy.get('[name="payee.address.zipCode"]').type('3000');
    cy.get('[name="payee.phoneNumber"]').type('987654321');
    cy.get('[name="payee.accountNumber"]').type(Cypress.env('NewAcc'))
    cy.get('[name="verifyAccount"]').type(Cypress.env('NewAcc'))
    cy.get('[name="amount"]').type('10');
    cy.get('input.button[value="Send Payment"]').click();
    cy.contains('Bill Payment Complete');
    });

 });
        
});








