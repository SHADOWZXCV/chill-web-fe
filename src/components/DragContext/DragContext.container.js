import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import DragContextComponent from "./DragContext.component";

const mapStateToProps = (state) => ({ theme: state.darkModeReducer.theme });
const mapDispatchToProps = () => ({});

export class DragContext extends PureComponent {
  static propTypes = {
    isOnFreeMode: PropTypes.bool,
  };

  state = {
    isOnFreeMode: false,
    dragFrom: 0,
    dragTo: 0,
  };

  componentDidUpdate() {
    const {
      isOnFreeMode,
      dragFrom,
      dragTo,
      draggedElem,
      facade,
      isGridUnlocked,
    } = this.props;
    this.setState({
      isOnFreeMode,
      dragFrom,
      dragTo,
      draggedElem,
      facade,
      isGridUnlocked,
    });
  }

  containerFunctions = {};

  containerProps = {
    ...this.props,
    ...this.containerFunctions,
  };

  render() {
    return <DragContextComponent {...this.containerProps} {...this.state} />;
  }
}

export default DragContext;
