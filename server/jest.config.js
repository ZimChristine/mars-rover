module.exports = {
	moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
	coverageDirectory: './coverage',
	collectCoverageFrom: ['server/**/*.js'],
	testRegex: '((\\.|/*.)(spec))\\.js?$',
	testEnvironment: 'node',
	coverageThreshold: {
		global: {
			branches: 5,
			functions: 5,
			lines: 5,
		},
	},
};
