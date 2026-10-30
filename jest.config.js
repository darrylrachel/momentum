module.exports = {
  preset: 'jest-expo',
  cacheDirectory: '<rootDir>/.jest-cache',
  modulePathIgnorePatterns: ['<rootDir>/.validation/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
};
