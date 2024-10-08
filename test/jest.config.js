import config from '../../../src/dev/jest/config';
export default {
  ...config,
  roots: ['<rootDir>/plugins/todoapp'],
  testMatch: ['**/public/**/*.test.{ts,tsx,js,jsx}', '**/common/*.test.{ts, tsx}'],
  testPathIgnorePatterns: [
    '<rootDir>/plugins/todoapp/build/',
    '<rootDir>/plugins/todoapp/node_modules/',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/dev/jest/setup/after_env.integration.js'],
  collectCoverageFrom: [
    '<rootDir>/plugins/todoapp/public/**/*.{ts,tsx}',
    '!<rootDir>/plugins/todoapp/public/**/*.test.{ts,tsx}',
  ],
  coverageDirectory: '<rootDir>/plugins/todoapp/opensearch-dashboardcoverage/jest_ui',
  clearMocks: true,
  coverageReporters: ['lcov', 'text', 'cobertura', 'html'],
};
