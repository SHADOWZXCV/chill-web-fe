import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import isSignedIn from "Utils/isSignedIn";
import MainAppComponent from "./MainApp.component";

export class MainApp extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  async setViewData() {
    return false;
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
    const { history } = this.props;
    if (!isSignedIn()) return history.push("/enter");
    this.setViewData();
  }

  containerFunctions = {};
  containerProps = {
    ...this.props,
    ...this.containerFunctions,
  };

  render() {
    return <MainAppComponent {...this.containerProps} />;
  }
}

export default MainApp;
