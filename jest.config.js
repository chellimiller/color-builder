/**
 * This is the configuration for {@link https://jestjs.io/ Jest}.
 *
 * Jest is a testing framework.
 * It is ideal for unit tests and some integration tests.
 *
 * Testing code is important for reliability.
 * Good tests ensure that bugfixes stay fixed
 * and that core functionality behaves as expected.
 *
 * @see {@link https://jestjs.io/docs/configuration Configuring Jest}
 * @type {Object}
 */
const config = {
  // Specify that the test environment should have a DOM.
  // This is important for testing a web app that runs in a browser.
  testEnvironment: 'jsdom',
  // Specify that code coverage should be collected.
  // Code coverage shows how many lines, functions, and branches are covered by tests.
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/dist/**'],
  coveragePathIgnorePatterns: ['/node_modules/', 'index', '_database.ts'],
  coverageThreshold: {
    // Specifies all global coverage at 100%
    // Though code coverage doesn't guarantee that every case is tested,
    //   it is a good metric for showing how testable the code is.
    // 100% code coverage is an easy metric that prevents unreachable code
    //   and ensures that important tests aren't skipped due to difficulty.
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  transform: {
    // Specify that all JS files should be transformed with @swc/jest.
    // The Speedy Web Compiler is not as mature as Babel,
    //  but it's very simple and requires little configuration to get working.
    // Because of this, it is often a great choice for transforming test files.
    // Eventually, this project may be updated to use SWC for everything.
    '^.+\\.(t|j)sx?$': '@swc/jest',
    // Specify that CSS files should be stubbed.
    '.+\\.css$': 'jest-transform-stub',
  },
};

module.exports = config;
