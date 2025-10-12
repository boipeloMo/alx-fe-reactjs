import React, { useState } from 'react';

const AddTodoForm = ({ addTodo }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTodo(task.trim());
      setTask(''); // Clear the input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Todo Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        data-testid="todo-input" // Crucial for testing
      />
      <button type="submit" data-testid="add-button">Add Todo</button>
    </form>
  );
};

export default AddTodoForm;
