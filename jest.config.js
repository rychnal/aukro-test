/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironmentOptions: {
    customExportConditions: ['default', 'require', 'node'],
  },
  transform: {
    '^.+\\.(ts|mjs|js|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$'
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|@angular/common/locales/.*\\.js$))'],
  testMatch: ['**/*.spec.ts'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/app/**/*.ts', '!src/app/**/*.spec.ts'],
};
