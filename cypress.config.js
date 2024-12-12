const { defineConfig } = require('cypress')

module.exports = defineConfig({
  backendUrl: 'http://localhost:5000',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/**/*.spec.js',
    baseUrl: 'http://localhost:8080',
  },
})
