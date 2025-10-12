import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "../components/TodoList.jsx";

describe("TodoList Component", () => {
  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByTestId("todo-1")).toBeInTheDocument();
    expect(screen.getByTestId("todo-2")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);
    const input = screen.getByTestId("new-todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    userEvent.type(input, "Check ALX");
    userEvent.click(addButton);

    expect(screen.getByText("Check ALX")).toBeInTheDocument();
  });

  test("toggles a todo's completed status", () => {
    render(<TodoList />);
    const todo = screen.getByTestId("todo-1");

    fireEvent.click(todo);
    expect(todo).toHaveStyle("text-decoration: line-through");

    fireEvent.click(todo);
    expect(todo).not.toHaveStyle("text-decoration: line-through");
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    const deleteButton = screen.getByTestId("delete-1");
    fireEvent.click(deleteButton);

    expect(screen.queryByTestId("todo-1")).toBeNull();
  });
});
