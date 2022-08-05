import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "./SubmitButton.style.scss";

export default class SubmitButton extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    noConnection: PropTypes.bool.isRequired,
  };

  render() {
    const { noConnection, value } = this.props;
    return (
      <input
        type="submit"
        className={noConnection ? "Submit-err" : "Submit"}
        value={noConnection ? "Can't connect, try again!" : value}
      />
    );
  }
}
