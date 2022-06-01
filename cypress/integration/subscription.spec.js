////import { faker } from '@faker-js/faker';

describe('login e subscription test', () => {
  it('sign-up and login', () => {
    // const userData = {
    //   email: faker.internet.email(), 
    //   password: faker.internet.password()
    // };

    cy.visit('http://localhost:3000/sign-in');
    cy.get('input').first().type('neto@gmail.com');
    cy.get('input').eq(1).type('123456');
    
    cy.intercept('post', '/auth/sign-in').as('login');
    cy.get('button').click();
    cy.wait('@login');

    cy.url().should('eq', 'http://localhost:3000/dashboard/subscription');
    cy.get('input').last().type(123);
    //cy.get('input').eq(1).type('11600240496');
  });
});
