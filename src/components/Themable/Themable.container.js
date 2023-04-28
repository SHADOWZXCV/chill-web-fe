import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ThemableComponent from "./Themable.component";

const mapStateToProps = (state) => ({ theme: state.darkModeReducer.theme });
const mapDispatchToProps = () => ({});

export class Themable extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,
    theme: PropTypes.string.isRequired,
  };

  // Expected data to get from BE:
  /*
   * selected workspace
   * -- structure of the current workspace
   * --- blocks
   * ---- data of each block
   * if not workspace present, render default view which is a blank page with a message in the middle!
   */

  containerFunctions = {};

  containerProps = {};

  render() {
    return <ThemableComponent {...this.props} {...this.containerFunctions} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Themable);
