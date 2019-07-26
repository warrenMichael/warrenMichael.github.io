import React from "react";
import "./css/app.css";

import Header from "./components/Header.js";
import TodoList from "./components/TodoList.js";

const App = () => {
  return (
    <div className="todo-list-application">
      <Header headerText="My TODO List" />
      <main role="main">
        <TodoList />
      </main>
    </div>
  );
};

export default App;
