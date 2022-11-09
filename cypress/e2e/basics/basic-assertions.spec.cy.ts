/// <reference types="cypress"/>

describe('Basic Assertion', ()=>{
    it('should ', function () {
        // should is assertion type of Chai Framework
        cy.visit('localhost:3100/login')
        // check length login via email button
        cy.get('button.btn.btn-block.btn-secondary.btn-cloud').should('have.length', 1)
        //check length login via ldap button
        cy.get('button.btn.btn-block.btn-secondary.btn-ldap').should('have.length', 1)
        // check length of oauth button
        cy.get('button.btn.btn-block.btn-secondary.btn-oauth').should('have.length', 2)
        cy.get('[data-testid="submit-oauth-login"]').should('have.length', 2)

        //Test will fail, cypress will let you know that one or more matched elements are not visible.
        // cy.get('.btn').should('have.length', 4) // 12 matched elements found
        //but we can assert just visible elements like this
        cy.get('.btn:visible').should( 'have.length', 4)
    });

    it('contains ', function () {
        cy.visit('localhost:3100/login')
        // check length login via email button
        cy.get('.btn').contains('Login mit E-Mail')
        //contains ldap button with content input
        cy.get('.btn').contains('Login über Schul-LDAP')
        //contains iserv button with content input
        cy.get('.btn').contains('Login über Schulserver')
        //contains sanis button with selector and content
        cy.contains('button','Login über SANIS')
    });


    it(' parent child chaining ', function () {
        cy.visit('localhost:3100/login')
        // the scope will be
        cy.get('.system-buttons').find('.btn').should('have.length', 4)
        cy.get('.system-buttons').find('.btn').eq(1).contains('Login über Schul-LDAP').click()
    });

    it(' iterate through array ', function () {
        cy.visit('localhost:3100/login')

        // $el is a wrapped jQuery element
        // the scope will be
        cy.get('.system-buttons').find('.btn').each((element, index, $list)=> {

            const btnTitle = element.text()
            if(!btnTitle.includes('Login')){
                cy.log('failed')
            }else {
                cy.log('include login')
            }

        })
    });
})
