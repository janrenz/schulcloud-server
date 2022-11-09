/// <reference types="cypress"/>
import cypress = require("cypress");

let baseUrl;
let clientId;
let redirectUri;
let responseType;
let scope;
let authEndpoint;
let sanisOrigin;
let sanisPathVar;
let encodedURI;
let issuer;
let username;
let pw;

before('get cypress env ', ()=> {
    baseUrl = Cypress.config('baseUrl');
    clientId = Cypress.env('sanis_test_client_id')
    redirectUri = Cypress.env('sanis_test_redirect_uri')
    responseType = Cypress.env('sanis_test_response_type')
    scope = Cypress.env('sanis_test_scope')
    authEndpoint = Cypress.env('sanis_authEndpoint')
    sanisOrigin = Cypress.env('sanis_origin')
    sanisPathVar = Cypress.env('sanis_visit')
    issuer = Cypress.env('sanis_issuer')
    username = Cypress.env('sanisUsername')
    pw = Cypress.env('sanisPassword')

    encodedURI = [
        '/auth?client_id=',
        clientId,
        '&redirect_uri=',
        redirectUri,
        '&response_type=',
        responseType,
        '&scope=',
        scope,
    ].join('');

})

describe('Login over Sanis', () => {

    it('SANIS should be available ', () => {
        cy.request({
            method: 'GET',
            url: `${sanisOrigin}${encodedURI}''`,
        }).then( (resp) => {
            expect(resp.status).to.eq(200)
        })
    })
    it('request Sanis should get statuscode 404', () => {
        cy.request({
            url: `${sanisOrigin}'someTextToFail'${sanisPathVar}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404)
        })
    })


    it('navigate to login page and click login button', () => {
        cy.visit(`${baseUrl}/`);
        cy.get('[data-testid="login-btn"]').click();
        cy.get('[data-provider="sanis"]').contains('Login über SANIS')
    })
    it('navigate to login overview and check oauth buttons', () => {
        cy.visit(`${baseUrl}/login`);
        cy.get("[data-testid=submit-oauth-login]").should('have.length', 2)
        cy.get("[data-testid=submit-oauth-login]").should('have.lengthOf.greaterThan', 0)

    })
    it('check if Sanis button exist', () => {
        cy.visit(`${baseUrl}/login`);
        cy.get('[data-provider="sanis"]').contains('Login über SANIS')
    })
    it('navigate to sanis provider login and loggin the user ', () => {
        cy.origin(sanisOrigin,{args: {encodedURI, username, pw, issuer}}, (args) => {
            cy.visit(`${args.encodedURI}`, {failOnStatusCode: false}).then((res) => {
                cy.get('#username').type(`${args.username}`)
                cy.get('#password').type(`${args.pw}`)

                cy.url().should('include', `${args.issuer}`)
                cy.location('href').should('include', 'SANIS')
                cy.contains('Anmelden').click()
            })
        })
            cy.url().should('include', 'localhost:3100/dashboard')
            cy.getCookie('jwt').should('exist')
            cy.getCookie('jwt').then((cookie) => {
                expect(cookie.domain).to.eq('localhost')
            })
        })



})
