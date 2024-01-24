// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
//generate rarandom user information

// function createRandomUser() {
//     const randomString = Math.random().toString(36).substring(7);
//     const randomPhoneNumber = Math.floor(Math.random() * 90000000) + 10000000;
//     const randomSSN = Math.floor(Math.random() * 90000) + 10000;
//     return {
//         firstName: `PB${randomString}`,
//         lastName: `BK${randomString}`,
//         address: `${Math.floor(Math.random() * 1000) + 1} Main St`,
//         city: 'Melbourne',
//         state: 'VIC',
//         zipCode: `${Math.floor(Math.random() * 9000) + 1}`,
//         phoneNumber: `+61${randomPhoneNumber}`,
//         ssn: `123-${randomSSN}-5678`,
//         username: `user_${randomString}`,
//         password: 'PB@123',
//         confirm: 'PB@123',
//       };
//   }

// Cypress.Commands.add('generateRandomUser', () => {
//     const randomUser = createRandomUser();
//     Cypress.env('randomUser', randomUser);
//     // You can log or output the random user information if needed
//     cy.log('Random User Created:', randomUser);

//   });







Cypress.Commands.add('login', () => {
    cy.fixture('test').then((data)=>{
        const username = data.RegisterUser;
        const password = data.Pwd;
        cy.log(username);
        cy.log(password);
        cy.visit('/index.htm');
        cy.get('input.input[name="username"]').type(username);
        cy.get('input.input[name="password"]').type(password);
        cy.get('input.button[type="submit"]').click();
    
      });
  });
