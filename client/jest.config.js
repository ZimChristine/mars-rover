module.exports = {
	moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
	coverageDirectory: './coverage',
	collectCoverageFrom: ['client/**/*.js'],
	testRegex: '((\\.|/*.)(spec))\\.js?$',
	setupFilesAfterEnv: ['./setupTests.js'],
	testEnvironment: 'jsdom',
	coverageThreshold: {
		global: {
			branches: 5,
			functions: 5,
			lines: 5,
		},
	},
};
