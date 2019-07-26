import React from "react";
import PropTypes from "prop-types";

import "../css/components/todo-item.css";

/**
 * PaywallRiser component
 *
 * @param {Object} props - React props
 * @param {string} [props.className] - optional class name
 * @param {function} props.handleCompletedCheckbox - execute on change on checkbox input
 * @param {string} props.id - unique id for todo item
 * @param {boolean} [props.isCompleted] - if todo item is completed
 * @param {function} [props.removeItem] - execute on clicking remove button
 * @param {string} props.text - text for todo item
 *
 * @returns {ReactElement} <aside>
 */
const TodoItem = ({
  className = "",
  handleCompletedCheckbox,
  id,
  isCompleted,
  removeItem,
  text
}) => {
  return (
    <div
      className={`todo-list-item ${className} ${
        isCompleted ? "completed" : ""
      }`}
    >
      <div className="todo-item-text">{text}</div>
      <div className="todo-options">
        <form>
          <label>
            <input
              className="completed-checkbox-input"
              checked={isCompleted}
              name="completed"
              onChange={handleCompletedCheckbox.bind(this, id)}
              type="checkbox"
            />
            <span className="completed-input-label">Completed</span>
          </label>
        </form>
        {removeItem && (
          <button className="btn-remove" onClick={removeItem.bind(this, id)}>
            × Remove this Item
          </button>
        )}
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  className: PropTypes.string,
  handleCompletedCheckbox: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool,
  removeItem: PropTypes.func,
  text: PropTypes.string.isRequired
};

export default TodoItem;
