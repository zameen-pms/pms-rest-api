module.exports = {
	testEnvironment: "node",
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageReporters: ["json", "lcov", "text", "clover"],
	collectCoverageFrom: ["src/**/*.js", "!src/**/*.test.js"],
};
