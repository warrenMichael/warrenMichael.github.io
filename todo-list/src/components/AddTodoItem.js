import React from "react";
import PropTypes from "prop-types";

import "../css/components/add-todo-item.css";

/**
 * PaywallRiser component
 *
 * @param {Object} props - React props
 * @param {string} [props.className] - optional class name
 * @param {string} props.labelText - label text for add item input, uses default if not set
 * @param {function} props.onSubmitHandler - function executes on submit
 *
 * @returns {ReactElement} <aside>
 */
const AddTodoItem = ({
  className = "",
  labelText = "Add TODO item",
  onSubmitHandler
}) => {
  return (
    <form
      className={`add-item-container ${className}`}
      onSubmit={onSubmitHandler}
    >
      <label>
        <span className="add-item-label">{labelText}</span>
        <input className="add-item-text-input" type="text" name="new-todo" />
      </label>
      <input className="add-item-submit" type="submit" value="Submit" />
    </form>
  );
};

AddTodoItem.propTypes = {
  className: PropTypes.string,
  labelText: PropTypes.string,
  onSubmitHandler: PropTypes.func.isRequired
};

export default AddTodoItem;
