import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// import { Puff } from "react-loading-icons";

import "./Loading.style.scss";

export class Loading extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
  };

  render() {
    const { isLoading } = this.props;
    if (isLoading)
      return (
        <div id="loading-icon-container">
          {/* <Puff stroke="#3E8EDC" /> */}
          <div id="loading-icon" />
        </div>
      );

    return null;
  }
}

export default Loading;
