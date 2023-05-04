import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import isSignedIn from "Utils/isSignedIn";
import MainAppComponent from "./MainApp.component";
import getBlocks from "../../query/Blocks/Blocks.query";

export class MainApp extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,
  };

  state = {
    blocks: [],
  };

  // get from server the view object
  setViewData() {
    return this.setState({ blocks: getBlocks() });
  }

  // Expected data to get from BE:
  /*
   * selected workspace
   * -- structure of the current workspace
   * --- blocks
   * ---- data of each block
   * if not workspace present, render default view which is a blank page with a message in the middle!
   */
  componentDidMount() {
    const { navigate } = this.props;
    if (!isSignedIn()) return navigate("/enter");
    this.setViewData();
  }

  containerFunctions = {};

  containerProps = {
    ...this.props,
    ...this.containerFunctions,
  };

  render() {
    return <MainAppComponent {...this.containerProps} {...this.state} />;
  }
}

export default MainApp;
