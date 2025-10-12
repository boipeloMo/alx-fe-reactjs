import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {

  // Test 1: Initial Render Test
  it('renders correctly and displays initial todos with correct completion status', () => {
    render(<TodoList />);
    
    // Check if the component title renders
    expect(screen.getByText(/My Todo List/i)).toBeInTheDocument();

    // Check if initial tasks are rendered
    const task1 = screen.getByText('Buy groceries');
    const task2 = screen.getByText('Finish React project');
    
    // Check initial completion status (strikethrough on the completed item)
    expect(task1).toHaveStyle('text-decoration: none'); // Uncompleted
    expect(task2).toHaveStyle('text-decoration: line-through'); // Completed
  });

  // Test 2: Test Adding Todos
  it('allows a user to add a new todo item', () => {
    render(<TodoList />);

    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    const newTask = 'Walk the dog';

    // 1. Simulate typing into the input
    fireEvent.change(input, { target: { value: newTask } });
    
    // 2. Simulate clicking the Add button
    fireEvent.click(addButton);

    // 3. Verify the new task is rendered and input is cleared
    expect(screen.getByText(newTask)).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  // Test 3: Test Toggling Todos
  it('allows a user to toggle a todo item completion status', () => {
    render(<TodoList />);
    
    const taskToToggle = screen.getByText('Buy groceries'); // Initial ID 1

    // 1. Check initial state: Should NOT be completed
    expect(taskToToggle).toHaveStyle('text-decoration: none');

    // 2. Simulate clicking the task to toggle it ON
    fireEvent.click(taskToToggle);

    // 3. Check new state: Should now be completed (line-through)
    expect(taskToToggle).toHaveStyle('text-decoration: line-through');

    // 4. Simulate clicking again to toggle it OFF
    fireEvent.click(taskToToggle);

    // 5. Check final state: Should be uncompleted again
    expect(taskToToggle).toHaveStyle('text-decoration: none');
  });

  // Test 4: Test Deleting Todos
  it('allows a user to delete a todo item', () => {
    render(<TodoList />);

    const taskToDeleteText = 'Go for a run';
    
    // 1. Verify the item is initially present
    expect(screen.getByText(taskToDeleteText)).toBeInTheDocument();

    // 2. Find the delete button for the known ID 3 (Go for a run)
    const deleteButton = screen.getByTestId('delete-button-3');

    // 3. Simulate clicking the Delete button
    fireEvent.click(deleteButton);

    // 4. Verify the item is no longer in the document using queryByText
    expect(screen.queryByText(taskToDeleteText)).not.toBeInTheDocument();
    
    // Ensure another item is still present (sanity check)
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
  });
});
