import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import GridContextComponent from "./GridContext.component";

export class GridContext extends PureComponent {
  static propTypes = {
    locked: PropTypes.bool.isRequired,
  };

  state = {};

  containerFunctions = {};

  containerProps = {
    ...this.props,
    ...this.containerFunctions,
  };

  render() {
    return <GridContextComponent {...this.containerProps} {...this.state} />;
  }
}

export default GridContext;
