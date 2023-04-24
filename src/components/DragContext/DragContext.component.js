import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./DragContext.style.scss";

export class DragContextComponent extends PureComponent {
  static propTypes = {
    children: PropTypes.array.isRequired,
    dropId: PropTypes.number.isRequired,
  };

  state = {
    isBlockDraggedOver: false,
    initialHeight: 0,
  };

  // handleHover() {
  //   const { draggedElem, isOnFreeMode, dropId } = this.props;
  //   const { isBlockDraggedOver, initialHeight } = this.state;
  //   console.log(draggedElem, isBlockDraggedOver, isOnFreeMode);
  //   if (!draggedElem && !isBlockDraggedOver && !isOnFreeMode) return;
  //   console.log("while hovering on: ", dropId);
  // }

  // createFacade() {
  //   const { draggedElem, isOnFreeMode, dropId } = this.props;
  //   const { isBlockDraggedOver, initialHeight } = this.state;
  //   console.log(isBlockDraggedOver, isOnFreeMode, dropId);
  //   if (!draggedElem && !isBlockDraggedOver && !isOnFreeMode) return;
  //   const { children } = this.dragContextRef;
  //   const block = draggedElem;
  //   const { x: blockX, y: blockY } = block.getBoundingClientRect();
  //   const facadeBlock = block.cloneNode(true);
  //   facadeBlock.dataset.dragged = "";
  //   facadeBlock.className += " Block_isBlockFacade";
  //   const height = getComputedStyle(block, null).getPropertyValue("height");
  //   const width = getComputedStyle(block, null).getPropertyValue("width");
  //   facadeBlock.style.height = height;
  //   facadeBlock.style.width = width;
  //   facadeBlock.style.position = "relative";
  //   facadeBlock.style.top = "";
  //   facadeBlock.style.left = "";
  //   facadeBlock.innerHTML = "";
  //   facadeBlock.dataset.isFacade = true;

  //   // this.dragContextRef.style.height = `${
  //   //   initialHeight + block.getBoundingClientRect().height
  //   // }px`;

  //   this.dragContextRef.onmouseover = (e) => {
  //     console.log(isBlockDraggedOver, isOnFreeMode, dropId);
  //     [...children].map((child, index) => {
  //       const {
  //         top: childTop,
  //         left: childLeft,
  //         bottom: childBottom,
  //         right: childRight,
  //       } = child.getBoundingClientRect();
  //       if (block === child || child.dataset.isFacade) return;
  //       if (
  //         blockY > childTop &&
  //         blockY < childBottom &&
  //         blockX < childRight &&
  //         blockX > childLeft
  //       ) {
  //         this.dragContextRef.insertBefore(
  //           facadeBlock,
  //           children[index].prevSibling
  //         );
  //         console.log("the following is near: ", child);
  //       }
  //     });
  //   };
  // }

  // componentDidMount() {
  //   const { dropId } = this.props;
  //   console.log("drop id: ", dropId);
  //   this.setState({
  //     initialHeight: document
  //       .querySelector(`[data-dragcontext-id="${dropId}"]`)
  //       .getBoundingClientRect().height,
  //   });
  // }

  componentDidUpdate() {
    const { dragTo, dropId, isOnFreeMode, facade } = this.props;
    if (dragTo == dropId && isOnFreeMode) {
      // this.createFacade();
      return this.setState({ isBlockDraggedOver: true, facade });
    }

    return this.setState({ isBlockDraggedOver: false });
  }

  // prevents elements overlapping in rows or columns after moved
  // checkChildrenSizes() {
  //   console.log("checking elements sizing...");
  //   const {
  //     gridSize: [row, column],
  //   } = this.props;
  //   for (let index = 1; index <= column; index++) {
  //     const children = [
  //       ...document.querySelectorAll(`[data-grid-column="${index}"]`),
  //     ];
  //     const childrenPos = [];
  //     children.map((child) => {
  //       const [rowStart, rowEnd] = child.style.gridRow.split(" / ").map(Number);
  //       // prevents rows from getting bigger than container
  //       // if (rowEnd > row) {
  //       //   child.style.gridRow = `${rowStart} / ${row}`;
  //       // }
  //       childrenPos.push(rowStart, rowEnd);
  //     });
  //     childrenPos.sort((a, b) => a - b);
  //     console.log(childrenPos);
  //     // for (let j = 1; j < childrenPos.length; j++) {
  //     //   if (j % 2 != 0) childrenPos[j] = childrenPos[j + 1];
  //     //   else
  //     //     children[j - 2].style.gridRow = `${childrenPos[j - 2]} / ${
  //     //       childrenPos[j - 1]
  //     //     }`;
  //     // }
  //   }
  // }

  render() {
    const {
      children,
      // dropId,
      // isOnFreeMode,
      // draggedElem,
      // className,
      // dragContextElementsPos,
      // isGridUnlocked,
      // gridSize,
    } = this.props;
    const { isBlockDraggedOver, facade, gridElemSizes } = this.state;
    return (
      <div
        className={
          (isBlockDraggedOver && isOnFreeMode
            ? "drag-context_isMouseOn"
            : "drag-context") + ` ${className}`
        }
        data-dragcontext-id={dropId}
        ref={(component) => {
          this.dragContextRef = component;
        }}
        // onMouseEnter={this.handleEntering.bind(this)}
        // onMouseOut={this.handleLeaving.bind(this)}
      >
        {children.length
          ? children.map((elem, i) => {
              const [startAt, endAt, startAtColumn] = dragContextElementsPos[i]
                .split(",")
                .map(Number);

              // if (!isOnFreeMode) this.checkChildrenSizes();
              return React.cloneElement(elem, {
                key: i,
                style: {
                  gridRowStart: startAt,
                  gridRowEnd: Number(endAt),
                  gridColumnStart: startAtColumn,
                },
                gridSize,
                startAt,
                endAt,
                startAtColumn,
                isOnFreeMode,
                draggedElem,
                facade,
                isGridUnlocked,
              });
            })
          : children}
      </div>
    );
  }
}

export default DragContextComponent;
