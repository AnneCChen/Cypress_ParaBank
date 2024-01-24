// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************








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
