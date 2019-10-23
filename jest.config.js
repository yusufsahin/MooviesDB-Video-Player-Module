module.exports = {
  testRegex: "((\\.|/*.)(test))\\.js?$",
  // transformIgnorePatterns: ["client/src/App.jsx"],
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js"
  ]
}