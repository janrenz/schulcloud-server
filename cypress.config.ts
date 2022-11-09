import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3100',
        specPattern: "cypress/e2e/**/*.cy.ts",
        experimentalSessionAndOrigin: true,
        chromeWebSecurity: false,
        requestTimeout: 10000,
        env: {
        },
        setupNodeEvents(on, config) {
            // implement node event listeners here

        },
    },
});
