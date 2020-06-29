module.exports = {
  preset: 'ts-jest',
  roots: [
    '<rootDir>/test'
  ],
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['json', 'html', 'text']
}
