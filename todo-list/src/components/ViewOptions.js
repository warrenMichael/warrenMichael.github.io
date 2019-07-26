import React from "react";
import PropTypes from "prop-types";

import "../css/components/view-options.css";

/**
 * PaywallRiser component
 *
 * @param {Object} props - React props
 * @param {string} [props.className] - optional class name
 * @param {boolean} props.handleViewOptions - function that executes on click of list item
 *
 * @returns {ReactElement} <aside>
 */
const ViewOptions = ({ className = "", handleViewOptions }) => {
  return (
    <div className={`view-options ${className}`}>
      <button
        className="view-option-item all"
        onClick={handleViewOptions.bind(this, "")}
      >
        All
      </button>
      <button
        className="view-option-item uncompleted"
        onClick={handleViewOptions.bind(this, "uncompleted")}
      >
        Uncompleted
      </button>
      <button
        className="view-option-item completed"
        onClick={handleViewOptions.bind(this, "completed")}
      >
        Completed
      </button>
    </div>
  );
};

ViewOptions.propTypes = {
  className: PropTypes.string,
  handleViewOptions: PropTypes.func.isRequired
};

export default ViewOptions;
