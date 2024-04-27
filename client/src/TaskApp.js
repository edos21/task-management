import React from "react";
import TaskList from "./components/TaskList";
//import TodoList from "./components/TodoList";
//import VisibilityFilters from "./components/VisibilityFilters";

export default function TaskApp() {
  return (
    <div className="task-app">
      <h1>Todo List</h1>
      <TaskList />
    </div>
  );
}
