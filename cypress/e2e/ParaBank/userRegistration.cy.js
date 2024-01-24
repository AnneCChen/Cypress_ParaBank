//User Register test

// Enter valid user registration details.
// Ensure a randomly generated and unique username is assigned to the user.
// Click on the 'Submit' button.
// Assertion: Verify that the user registration is successful and the user is redirected to the login page.


//Generate random user information


const generateRandomUser = () =>  {
  const randomString = Math.random().toString(36).substring(7);
  const randomPhoneNumber = Math.floor(Math.random() * 90000000) + 10000000;
  const randomSSN = Math.floor(Math.random() * 90000) + 10000;

  return {
    firstName: `Chen${randomString}`,
    lastName: `C${randomString}`,
    address: `${Math.floor(Math.random() * 1000) + 1} Main St`,
    city: 'Melbourne',
    state: 'VIC',
    zipCode: `${Math.floor(Math.random() * 9000) + 1}`,
    phoneNumber: `+61${randomPhoneNumber}`,
    ssn: `123-${randomSSN}-5678`,
    username: `user_${randomString}`,
    password: 'PB@123',
    confirm: 'PB@123',
  };
};



describe('User Registration Tests', () => {

  it('Should create a new user from the user registration page', () => {
    cy.visit('/index.htm');
    const newUser = generateRandomUser();
//     fillRegistrationForm(newUser);
    cy.get("a[href*='register.htm']").click();
    cy.url().should('include', 'register.htm;jsessionid');




    // Fill in the registration form with the generated user data
    cy.get('#customer\\.firstName').type(newUser.firstName);
    cy.get('#customer\\.lastName').type(newUser.lastName);
    cy.get('#customer\\.address\\.street').type(newUser.address);
    cy.get('#customer\\.address\\.city').type(newUser.city);
    cy.get('#customer\\.address\\.state').type(newUser.state);
    cy.get('#customer\\.address\\.zipCode').type(newUser.zipCode);
    cy.get('#customer\\.phoneNumber').type(newUser.phoneNumber);
    cy.get('#customer\\.ssn').type(newUser.ssn);
    cy.get('#customer\\.username').type(newUser.firstName);
    cy.get('#customer\\.password').type(newUser.password);
    cy.get('#repeatedPassword').type(newUser.password);

    // Submit the registration form
    cy.get('input.button[value="Register"]').click();

    // Assertions can be added based on the expected behavior after registration
    cy.url().should('include', '/register.htm');
    cy.contains('Welcome ' + newUser.firstName); 



    //get the first account in this user and save to acc.json, will be used for transaction testing 
    cy.get('a[href="/parabank/overview.htm"]:contains("Accounts Overview")').click();

    
    // cy.get('#accountTable tbody tr').eq(0).find('td').eq(0).invoke('text').then((text) => {
    //   cy.log('OriAccID:', text);
    // //  cy.writeFile('cypress/fixtures/acc.json', { OriAccID });
    //   return OriAccID
    // });
    // let OriAccID
    // cy.log(OriAccID)


    // cy.log(newUser.firstName);
    // cy.log(newUser.password)
    cy.writeFile('cypress/fixtures/test.json',{
      RegisterUser: newUser.firstName,
      Pwd: newUser.password
    });
  });
});



