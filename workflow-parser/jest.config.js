// jest.config.js

module.exports = {
  // This pattern correctly finds your test file in the /tests/ directory.
  testMatch: ["**/tests/**/*.test.js"],

  // This tells Jest to use the default console reporter AND
  // your custom slack-reporter.js file. The <rootDir> token
  // is a special variable from Jest that points to your project's root folder.
  reporters: [
    "default",
    "<rootDir>/slack-reporter.js"
  ],
};