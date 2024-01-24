//Navigation Test
describe('Navigation Tests', () => {
    it('Should navigate to Para bank application', () => {
      cy.visit('/')
      cy.visit('/index.htm');
      cy.url().should('include', '/index.htm');
    });
  });