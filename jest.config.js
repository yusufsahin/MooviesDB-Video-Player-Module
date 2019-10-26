module.exports = {
  testEnvironment: 'node',
  testRegex: "((\\.|/*.)(test))\\.js?$",
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js"
  ]
}