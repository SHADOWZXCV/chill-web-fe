import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// import { isMobile } from "react-device-detect";

import "./Themable.style.scss";

export class ThemableComponent extends PureComponent {
  static propTypes = {
    // changeTheme: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  // switchMode() {
  //   const { changeTheme, theme } = this.props;
  //   changeTheme(theme === "dark" ? "light" : "dark");
  // }

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
