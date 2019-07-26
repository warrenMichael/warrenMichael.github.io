import React from "react";
import PropTypes from "prop-types";

import "../css/components/header.css";

/**
 * PaywallRiser component
 *
 * @param {Object} props - React props
 * @param {string} [props.className] - optional class name
 * @param {string} props.headerText = - text to use for h1
 *
 * @returns {ReactElement} <aside>
 */
const Header = ({ className = "", headerText }) => {
  return (
    <header className={`todo-header ${className}`}>
      <h1 className="hdr">{headerText}</h1>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  headerText: PropTypes.string.isRequired
};

export default Header;
