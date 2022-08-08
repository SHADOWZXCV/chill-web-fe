import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// import { isMobile } from "react-device-detect";

import "./MainApp.style.scss";

export class MainAppComponent extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <h1>welcome to app!</h1>
      </div>
    );
  }
}

export default MainAppComponent;
