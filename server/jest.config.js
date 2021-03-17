module.exports = {
  roots: ['src', 'tests'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/helpers/setup-tests.ts'],
  testRegex: '.(spec|e2e).ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
}
