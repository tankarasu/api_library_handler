module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^#src/(.*)$": "<rootDir>/src/$1"
  },
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: [
    "./jest.setup.js"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/src/**/*.ts"
  ],
  testMatch: [
    "**/test/**/*.spec.ts"
  ]
};
