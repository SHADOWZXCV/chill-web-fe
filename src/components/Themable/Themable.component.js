import React, { Component } from "react";
import PropTypes from "prop-types";
// import { isMobile } from "react-device-detect";

import "./Themable.style.scss";

export class ThemableComponent extends Component {
  static propTypes = {
    theme: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  render() {
    const { theme, children } = this.props;
    return (
      <div
        className={`theme-container${
          theme === "dark" ? "-dark" : "-light"
        } theme-container`}
      >
        {children}
      </div>
    );
  }
}

export default ThemableComponent;
