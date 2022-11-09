/// <reference types="cypress"/>

// cypress locater strategie
describe('Select the right way', ()=>{
    it(' using id="title" eq #title ', function () {
        cy.visit('localhost:3100')
        cy.get('#title')
    });

    it(' using class="classname" eq .classname ', function () {
        cy.visit('localhost:3100')
        cy.get('[class=logo]')
        cy.get('.logo')
    });

    it('using tagname.classname ', function () {
        cy.visit('localhost:3100/login')
        // get oauth buttons
        cy.get('button[data-testId=submit-oauth-login]')
        cy.get('button.btn.btn-block.btn-secondary.btn-oauth')
    });


})

