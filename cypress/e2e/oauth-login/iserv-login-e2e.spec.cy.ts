/// <reference types="cypress"/>
import cypress = require("cypress");

let baseUrl;
let clientId;
let responseType;
let scope;
let authEndpoint;
let redirectUri;
let iservOrigin;
let iservPathVar;
let issuer;
let username;
let password;

before('', ()=>{
    baseUrl = Cypress.config('baseUrl');
    clientId = Cypress.env('iserv_test_client_id')
    redirectUri = Cypress.env('iserv_test_redirect_uri')
    responseType = Cypress.env('iserv_test_response_type')
    scope = Cypress.env('iserv_test_scope')
    authEndpoint = Cypress.env('iserv_authEndpoint')
    iservOrigin = Cypress.env('iserv_origin')
    iservPathVar = Cypress.env('iserv_visit')
    issuer = Cypress.env('iserv_issuer')
    username = Cypress.env('iservUsername')
    password = Cypress.env('iservPassword')


})

describe('Login over Iserv UI', () => {

    it('iserv should be available', function () {

        cy.visit('/dashboard');
        const options = {
            method: 'GET',
            url: `${iservOrigin}${iservPathVar}`,
        }
        cy.request(options).then((res) => {
                expect(res.status).to.eq(200)
                console.log(res)
            }
        )

    });

    it('navigate to login page and check oauth buttons', () => {
        cy.visit('http://localhost:3100/');
        cy.get('[data-testid="login-btn"]').click();
        cy.get("[data-testid=submit-oauth-login]").should('have.length', 2)
        cy.get("[data-testid=submit-oauth-login]").should('have.lengthOf.greaterThan', 0)
    });

    it('passes iserv login and check cookie', () => {
        cy.visit('http://localhost:3100/');
        cy.get('[data-testid="login-btn"]').click();
        cy.get('[data-provider="iserv"]').contains('Login über Schulserver').click();
        cy.origin(`${iservOrigin}`, { args: {iservPathVar, username, password, issuer},}, (args) => {
            cy.visit(`${args.iservPathVar}`, { failOnStatusCode: false}).then((res) => {
                cy.get("[name=_username]").type(`${args.username}`)
                cy.get("[name=_password]").type(`${args.password}`)
                cy.contains('Anmelden').click()
                cy.location('href').should('include', 'iserv')
                cy.get("[id=authorize_form_actions_accept]").click()
            })
        })
        cy.getCookie('jwt').should('exist')
        cy.getCookie('jwt').then((cookie) => {
            expect(cookie.domain).to.eq('localhost')
        })
    })
})
