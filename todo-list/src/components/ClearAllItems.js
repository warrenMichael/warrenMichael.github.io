import React from "react";
import PropTypes from "prop-types";

import "../css/components/clear-all-items.css";

/**
 * PaywallRiser component
 *
 * @param {Object} props - React props
 * @param {string} [props.className] - optional class name
 * @param {function} props.clearAll - function that executes on click of list item
 *
 * @returns {ReactElement} <aside>
 */
const ClearAllItems = ({ className = "", clearAll }) => {
  return (
    <div className={`clear-all-btn-wrapper ${className}`}>
      <button className="clear-all-btn" onClick={clearAll}>
        Clear all items
      </button>
    </div>
  );
};

ClearAllItems.propTypes = {
  className: PropTypes.string,
  clearAll: PropTypes.func.isRequired
};

export default ClearAllItems;
