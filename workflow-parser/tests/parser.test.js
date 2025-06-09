// tests/parser.test.js
const { WorkflowParser } = require('../src/index');

describe('Workflow Parser Unit Test', () => {

  test('should successfully import the WorkflowParser class', () => {
    // This test confirms that the main class from the project is exported correctly.
    expect(WorkflowParser).toBeDefined();
  });

  test('WorkflowParser should be a function (class)', () => {
    // In JavaScript, classes are technically functions.
    // This test verifies we have correctly imported the class constructor.
    expect(typeof WorkflowParser).toBe('function');
  });

});