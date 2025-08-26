import React from "react";
import "./App.css";
import TaskList from "./components/Projects/TaskList";
import TaskForm from "./components/Projects/TaskForm";

function App() {
  return (
    <div className="App">
      <header className="App-main-content">
        <TaskList />
        <TaskForm />
      </header>
    </div>
  );
}

export default App;
