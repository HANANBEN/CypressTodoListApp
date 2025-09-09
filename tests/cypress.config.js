const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/mocha_reports",  
    overwrite: false,
    html: true,  
    json: true    
  },
  screenshotsFolder: "cypress/reports/screenshots", 
  videosFolder: "cypress/reports/videos",           
  video: true, 
  screenshotOnRunFailure: true,
                                     
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/spec_definitions/**/*.cy.js",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});