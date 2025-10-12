import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

// The initial demo tasks are:
// 1. 'Buy groceries' (not completed)
// 2. 'Finish React project' (completed)
// 3. 'Go for a run' (not completed)

describe('TodoList Component', () => {
  // Test 1: Initial Render Test
  it('renders correctly and displays initial todos', () => {
    render(<TodoList />);
    
    // Check if the component title renders
    expect(screen.getByText(/My Todo List/i)).toBeInTheDocument();

    // Check if the three initial tasks are rendered
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByText('Finish React project')).toBeInTheDocument();
    expect(screen.getByText('Go for a run')).toBeInTheDocument();
    
    // Check for the initial completion status (strikethrough on the completed item)
    const completedItem = screen.getByText('Finish React project');
    // Using inline style check for demonstration, though testing user experience is preferred
    expect(completedItem).toHaveStyle('text-decoration: line-through');

    const uncompletedItem = screen.getByText('Buy groceries');
    expect(uncompletedItem).toHaveStyle('text-decoration: none');
  });

  // Test 2: Test Adding Todos
  it('allows a user to add a new todo item', () => {
    render(<TodoList />);

    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    const newTask = 'Walk the dog';

    // Simulate typing into the input
    fireEvent.change(input, { target: { value: newTask } });
    
    // Simulate clicking the Add button (form submission)
    fireEvent.click(addButton);

    // Verify the new task is now in the document
    const addedTodo = screen.getByText(newTask);
    expect(addedTodo).toBeInTheDocument();
    
    // Verify the input field is cleared
    expect(input).toHaveValue('');
  });

  // Test 3: Test Toggling Todos
  it('allows a user to toggle a todo item completion status', () => {
    render(<TodoList />);
    
    const taskToToggle = screen.getByText('Buy groceries');
    
    // 1. Check initial state: Should NOT be completed (no line-through)
    expect(taskToToggle).toHaveStyle('text-decoration: none');

    // 2. Simulate clicking the task to toggle
    fireEvent.click(taskToToggle);

    // 3. Check new state: Should now be completed (line-through)
    expect(taskToToggle).toHaveStyle('text-decoration: line-through');

    // 4. Simulate clicking again to untoggle
    fireEvent.click(taskToToggle);

    // 5. Check final state: Should be uncompleted again (no line-through)
    expect(taskToToggle).toHaveStyle('text-decoration: none');
  });

  // Test 4: Test Deleting Todos
  it('allows a user to delete a todo item', () => {
    render(<TodoList />);

    const taskToDelete = 'Go for a run';
    
    // 1. Verify the item is initially present
    const todoItem = screen.getByText(taskToDelete);
    expect(todoItem).toBeInTheDocument();

    // The delete button is within the list item containing the task text.
    // We use `within` to find the button associated with the specific task.
    // The component structure uses a specific data-testid on the button.
    const deleteButton = screen.getByTestId('delete-button-3'); // 'Go for a run' is ID 3

    // 2. Simulate clicking the Delete button
    fireEvent.click(deleteButton);

    // 3. Verify the item is no longer in the document
    expect(screen.queryByText(taskToDelete)).not.toBeInTheDocument();
    
    // Verify the other initial items are still present
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
  });
});
