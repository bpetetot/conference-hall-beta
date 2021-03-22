module.exports = {
  roots: ['src', 'tests'],
  testEnvironment: 'node',
  testRegex: '.(spec|e2e).ts$',
  setupFilesAfterEnv: ['<rootDir>/tests/helpers/setup-tests.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
}
