module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: [
    'packages/*/src/**/*.js'
  ],
  setupFiles: [
    './scripts/setupJest.js'
  ],
  setupFilesAfterEnv: [
    './scripts/setupJestEnv.js'
  ],
  moduleNameMapper: {
    '^@utils/(.*?)$': '<rootDir>/packages/$1/src',
    's-utils': '<rootDir>/packages/utils/src'
  },
  rootDir: __dirname,
  testMatch: [
    '**/__tests__/**/*.spec.js'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
}
