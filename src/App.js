import React from "react";
import "./App.css";
import TaskList from "./components/Pages/Projects/TaskList";
import TaskForm from "./components/Pages/Projects/TaskForm";
import LoginPage from "./components/Pages/Auth/LoginPage";

function App() {
  return (
    <div className="App">
      <header className="App-main-content">
        <LoginPage />
        {/* <TaskList />
        <TaskForm /> */}
      </header>
    </div>
  );
}

export default App;
