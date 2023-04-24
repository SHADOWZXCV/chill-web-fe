import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import DraggableComponent from "./Draggable.component";

const mapStateToProps = (state) => ({ theme: state.darkModeReducer.theme });
const mapDispatchToProps = () => ({});

export class Draggable extends PureComponent {
  static propTypes = {};

  state = {};

  componentDidUpdate() {
    const { isOnFreeMode, draggedElem, facade, isGridUnlocked } = this.props;
    this.setState({ isOnFreeMode, draggedElem, facade, isGridUnlocked });
  }

  containerFunctions = {};

  containerProps = {
    ...this.props,
    ...this.containerFunctions,
  };

  render() {
    return <DraggableComponent {...this.containerProps} {...this.state} />;
  }
}

export default Draggable;
