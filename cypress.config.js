const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  
  env: {
    api: "https://rickandmortyapi.com/api",
    baseUrl: "https://www.saucedemo.com/",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
