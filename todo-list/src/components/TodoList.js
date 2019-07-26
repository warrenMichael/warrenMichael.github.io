import React from "react";

import ClearAllItems from "./ClearAllItems";
import TodoItem from "./TodoItem";
import ViewOptions from "./ViewOptions";
import AddTodoItem from "./AddTodoItem";

import GenerateUniqueId from "../helpers/generate-unique-id";

import "../css/components/todo-list.css";

/**
 * PaywallRiser component
 *
 * @param {Object} props - React props
 * @param {string} [props.className] - optional class name
 *
 * @returns {ReactElement} <aside>
 */
class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemView: "",
      todoItems: []
    };
    this.addItem = this.addItem.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.handleCompletedCheckbox = this.handleCompletedCheckbox.bind(this);
    this.handleViewOptions = this.handleViewOptions.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem(event) {
    event.preventDefault();
    const newTodo = {
      id: GenerateUniqueId(),
      isCompleted: false,
      text: event.target.querySelector('[name="new-todo"]').value
    };
    const newTododArr = this.state.todoItems.concat([newTodo]);
    this.setState({
      todoItems: newTododArr
    });
    localStorage.setItem("todoItems", JSON.stringify(newTododArr));
  }

  componentDidMount() {
    const todoItems = JSON.parse(localStorage.getItem("todoItems"));
    this.setState({
      todoItems
    });
  }

  clearAll() {
    this.setState({
      todoItems: []
    });
    localStorage.setItem("todoItems", JSON.stringify([]));
  }

  handleCompletedCheckbox(itemId) {
    const newTodoList = this.state.todoItems.map(item => {
      if (itemId === item.id) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    this.setState({
      todoItems: newTodoList
    });
    localStorage.setItem("todoItems", JSON.stringify(newTodoList));
  }

  handleViewOptions(itemView) {
    this.setState({
      itemView
    });
  }

  removeItem(itemId) {
    const newTodoList = this.state.todoItems.filter(item => {
      return item.id !== itemId;
    });
    this.setState({
      todoItems: newTodoList
    });
    localStorage.setItem("todoItems", JSON.stringify(newTodoList));
  }

  render() {
    const { todoItems } = this.state;
    return (
      <div className={`todo-list ${this.state.itemView}`}>
        <ViewOptions
          className={this.state.itemView}
          handleViewOptions={this.handleViewOptions}
        />
        <ClearAllItems clearAll={this.clearAll} />
        {!this.state.todoItems.length && (
          <p className="no-tasks-text">
            Currently you have no todo tasks. Add some more or take a breather.
          </p>
        )}
        {todoItems.map(item => {
          return (
            <TodoItem
              handleCompletedCheckbox={this.handleCompletedCheckbox}
              id={item.id}
              isCompleted={item.isCompleted}
              key={`${item.id}`}
              removeItem={this.removeItem}
              text={item.text}
            />
          );
        })}
        <AddTodoItem onSubmitHandler={this.addItem} />
      </div>
    );
  }
}

export default TodoList;
