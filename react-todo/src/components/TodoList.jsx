import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';

// Initial state with demo todos
const initialTodos = [
  { id: 1, task: 'Buy groceries', completed: false },
  { id: 2, task: 'Finish React project', completed: true },
  { id: 3, task: 'Go for a run', completed: false },
];

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);

  // Helper to generate unique IDs
  const generateId = () => {
    const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;
    return maxId + 1;
  };

  /**
   * Adds a new todo item to the list.
   * @param {string} task The task description.
   */
  const addTodo = (task) => {
    const newTodo = {
      id: generateId(),
      task,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  /**
   * Toggles the completion status of a todo item.
   * @param {number} id The ID of the todo to toggle.
   */
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**
   * Deletes a todo item from the list.
   * @param {number} id The ID of the todo to delete.
   */
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div data-testid="todo-list-container">
      <h1>My Todo List</h1>
      
      {/* Form to add new todos */}
      <AddTodoForm addTodo={addTodo} />

      {/* List of todos */}
      <ul data-testid="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            // Style for toggling completion
            style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
          >
            {/* Click to toggle completion */}
            <span
              onClick={() => toggleTodo(todo.id)}
              data-testid={`todo-item-task-${todo.id}`}
            >
              {todo.task}
            </span>
            
            {/* Button to delete todo */}
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: '10px' }}
              data-testid={`delete-button-${todo.id}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && <p>No todos yet! Add one above.</p>}
    </div>
  );
};

export default TodoList;
