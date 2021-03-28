module.exports = {
  roots: ['src', 'tests'],
  testEnvironment: 'node',
  testRegex: '.(spec|e2e).ts$',
  setupFilesAfterEnv: ['<rootDir>/tests/helpers/setup-tests.ts'],
  resetMocks: true,
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
}
