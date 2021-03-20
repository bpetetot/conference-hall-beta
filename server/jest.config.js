module.exports = {
  roots: ['src', 'tests'],
  testEnvironment: 'node',
  testRegex: '.(spec|e2e).ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
}
