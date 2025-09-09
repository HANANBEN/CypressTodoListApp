const { defineConfig } = require("cypress");


module.exports = defineConfig({
reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "qa/cypress/reports/mocha_reports",
    overwrite: false,
    html: true,
    json: true,
  },
  screenshotsFolder: "qa/cypress/reports/screenshots", 
  videosFolder: "qa/cypress/reports/videos",           
  video: true, 
  screenshotOnRunFailure: true,
 embeddedScreenshots: false, // intègre les screenshots directement dans le rapport
  inlineAssets: false, 
                                     
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "qa/cypress/e2e/spec_definitions/**/*.cy.js",
    supportFile: "qa/cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

    },
  },
});