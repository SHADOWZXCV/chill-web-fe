import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import GridContextComponent from "./GridContext.component";

const mapStateToProps = (state) => ({ theme: state.darkModeReducer.theme });
const mapDispatchToProps = () => ({});

export class GridContext extends PureComponent {
  static propTypes = {};

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
