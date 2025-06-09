// In tests/WorkflowParser.spec.js

// First, we import the actual class we want to test.
// Note: We are importing directly from its source file to be precise.
const { WorkflowParser } = require('../src/workflowparser');

// We are going to test the WorkflowParser class.
describe('WorkflowParser Class', () => {
  // Let's declare variables for our fake (mock) dependencies.
  // We will create fresh mocks for each test.
  let mockWorkflow;
  let mockDisplay;
  let mockAction;
  let mockOptions;

  // beforeEach is a Jest function that runs before every single test.
  // This is the perfect place to reset our mocks to ensure tests don't
  // interfere with each other.
  beforeEach(() => {
    // Create a fake "workflow" dependency object.
    // The methods are Jest Mock Functions (`jest.fn()`), which let us track
    // if they were called and control what they return.
    mockWorkflow = {
      getWorkflowByID: jest.fn(),
      getInstanceByID: jest.fn(),
      updateInstanceByID: jest.fn(),
      createInstance: jest.fn(),
    };

    // Create a fake "display" dependency.
    mockDisplay = {
      processDisplay: jest.fn(),
    };
    
    // Create a fake "action" dependency.
    mockAction = {
      processAction: jest.fn(),
    };

    // Create a fake "options" dependency.
    mockOptions = {
      extensions: []
    }
  });

  // --- TEST CASE 1 ---
  // A simple test to ensure the class can be created with our mocks.
  test('should be instantiated correctly with its dependencies', () => {
    // Act: We create an instance of the class using our fake dependencies.
    const parser = new WorkflowParser(mockDisplay, mockAction, mockWorkflow, mockOptions);

    // Assert: We just check that the object was created successfully.
    expect(parser).toBeDefined();
  });

  // --- TEST CASE 2 ---
  // A more advanced test for the `parse` method.
  test('parse() should fetch a workflow and an instance', async () => {
    // Arrange (Setup):
    // 1. We create the parser instance with our fakes.
    const parser = new WorkflowParser(mockDisplay, mockAction, mockWorkflow, mockOptions);

    // 2. We control our mocks' behavior. We tell the fake `getInstanceByID`
    //    method to return a promise that resolves to `null`, simulating
    //    a new user who has no saved state.
    mockWorkflow.getInstanceByID.mockResolvedValue(null);

    // 3. We tell the fake `getWorkflowByID` method to return a fake workflow
    //    object when it's called.
    mockWorkflow.getWorkflowByID.mockResolvedValue({
      workflow_id: 'test-workflow',
      initial_state: 'start_node',
    });

    // Act (Execution):
    // Now we call the actual `.parse()` method on our real parser instance.
    // It will be running its real logic, but calling our fake dependencies.
    await parser.parse('client-123', { actionID: 'start' });

    // Assert (Verification):
    // We check if our mocks were used as expected.
    // Was the "get instance" method called once?
    expect(mockWorkflow.getInstanceByID).toHaveBeenCalledTimes(1);

    // Was the "get workflow" method called with the correct ID?
    expect(mockWorkflow.getWorkflowByID).toHaveBeenCalledWith('test-workflow');
  });
});