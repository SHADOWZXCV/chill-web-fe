import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Draggable.style.scss";
const mapStateToProps = (state) => ({
  editView: state.editViewReducer.editView,
});
const mapDispatchToProps = () => ({});

export class DraggableComponent extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    isOnFreeMode: PropTypes.bool.isRequired,
    isDraggable: PropTypes.bool,
    isGridUnlocked: PropTypes.bool,
    draggedElem: PropTypes.object,
    facade: PropTypes.object,
    className: PropTypes.string,
    dragId: PropTypes.number,
    style: PropTypes.object,
  };

  state = {
    isOnFreeMode: false,
    mouseMoveEnabled: false,
  };

  componentDidUpdate() {
    const { isOnFreeMode } = this.props;
    // this.updateChild();
    if (isOnFreeMode) {
      this.setState({ isOnFreeMode: true });
      return this.createFacade();
    }
    return this.setState({ isOnFreeMode: false });
  }

  createFacade() {
    const { draggedElem } = this.props;
    const { isOnFreeMode, mouseMoveEnabled } = this.state;
    const child = this.draggableRef;
    const { draggable } = child.dataset;
    if (!isOnFreeMode) {
      this.draggableRef.onmousemove = null;
      this.draggableRef.onmouseout = null;
      return this.setState({ mouseMoveEnabled: false });
    }
    if (mouseMoveEnabled || draggedElem === child || draggable === "false")
      return;

    // TODO: FIX THIS GARBAGE!
    child.onmousemove = () => {
      if (mouseMoveEnabled) return;
      // this.setAnimation(child, facade);
      this.swapChildAndFacade(child);
      // const [rowStart, columnStart] = holder.split(" / ");
      // const facadeGridArea = holder.replace(/[^0-9]/g, "");
      // const childGridArea = child.style.gridArea.replace(/[^0-9]/g, "");
      // console.log(
      //   `child new grid area: ${facadeGridArea[0]} / ${facadeGridArea[1]} / span ${endAt} / auto`
      // );
      // console.log(
      //   `facade new grid area: ${startAt} / ${startAtColumn} / span ${facadeGridArea[2]} / auto`
      // );
      // const childNewGridArea = `${
      //   Number(facadeGridArea[0]) + Number(childGridArea[2])
      // } / ${childGridArea[1]} / span ${facadeGridArea[2]} / auto`;
      // const facadeNewGridArea = `${facadeGridArea[0]} / ${facadeGridArea[1]} / span ${endAt} / auto`;
    };

    this.setState({ mouseMoveEnabled: true });
  }
  // setAnimation(child, facade) {}
  swapChildAndFacade(child) {
    const {
      facade,
      gridSize: [row, column],
    } = this.props;
    const holder = [facade.style.gridRow, facade.style.gridColumnStart];
    const [fSt, fEnd] = holder[0].split(" / ").map(Number);
    const [childStart, childEnd] = child.style.gridRow.split(" / ").map(Number);
    const facadeCol = Number(holder[1]);
    const childCol = Number(child.style.gridColumnStart);

    if (fSt >= childEnd) {
      console.log("bigger");
      const nFend = childStart + (fEnd - fSt);
      const facadeNewPos = `${childStart} / ${nFend}`;
      console.log(facadeNewPos);
      const childNewEnd = nFend + (childEnd - childStart);
      const childNewPos = `${nFend} / ${childNewEnd > row ? row : childNewEnd}`;
      console.log(childNewPos);
      facade.style.gridRow = facadeNewPos;
      child.style.gridRow = childNewPos;
    } else if (childCol !== facadeCol) {
      console.log("columns are different!");
      const newFacadeEnd = childStart + (fEnd - fSt);
      const facadeNewPos = `${childStart} / ${
        newFacadeEnd > row ? row : newFacadeEnd
      }`;
      const childNewEnd = fSt + (childEnd - childStart);
      const childNewPos = `${fSt} / ${childNewEnd > row ? row : childNewEnd}`;
      facade.style.gridRow = facadeNewPos;
      child.style.gridRow = childNewPos;
    } else {
      const nCend = fSt + (childEnd - childStart);
      const childNewPos = `${fSt} / ${nCend}`;
      const facadeNewEnd = nCend + (fEnd - fSt);
      const facadeNewPos = `${nCend} / ${
        facadeNewEnd > row ? row : facadeNewEnd
      }`;
      console.log(facadeNewPos);
      console.log(childNewPos);
      facade.style.gridRow = facadeNewPos;
      child.style.gridRow = childNewPos;
    }
    // const draggedEnd = Number(facadeDiff[1]) - Number(facadeDiff[0]) + 1;
    // console.log(facadeDiff);
    // console.log(childStartAt, " / ", childEndAt);
    // facade.style.gridRow = `${childStartAt} / ${draggedEnd}`;
    // console.log(
    //   "child diff: ",
    //   childEndAt,
    //   childStartAt,
    //   childEndAt - childStartAt
    // );
    // child.style.gridRow = `${draggedEnd} / ${
    //   draggedEnd + (childEndAt - childStartAt)
    // }`;
    // facade.style.gridRow = child.style.gridRow;
    // child.style.gridRow = holder[0];
    facade.style.gridColumnStart = child.style.gridColumnStart;
    child.style.gridColumnStart = holder[1];
  }
  putDatasets() {
    const { startAtColumn } = this.props;
    const child = this.draggableRef;
    if (child)
      child.dataset.gridColumn = child.style.gridColumnStart || startAtColumn;
  }

  render() {
    const {
      children,
      dragId,
      style,
      isDraggable,
      className,
      isOnFreeMode,
      editView,
    } = this.props;

    this.putDatasets();
    return (
      <div
        style={style}
        data-drag-id={dragId}
        data-draggable={isDraggable || true}
        className={`Draggable${
          editView && !isOnFreeMode ? " Draggable_isVibrating" : ""
        }${className ? className : ""}${
          editView ? " Draggable_isOnDragMode" : ""
        }`}
        ref={(component) => {
          this.draggableRef = component;
        }}
      >
        {/* {editView ? <div className="DragCase"></div> : null} */}
        {children}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DraggableComponent);
