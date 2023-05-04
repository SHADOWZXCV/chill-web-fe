import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./GridContext.style.scss";
const mapStateToProps = (state) => ({
  editView: state.editViewReducer.editView,
});
const mapDispatchToProps = () => ({});

export class GridContextComponent extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    editView: PropTypes.bool,
  };

  state = {
    isOnFreeMode: false,
    dragFrom: 0,
    dragTo: 0,
    draggedElem: null,
    facade: 0,
  };

  turnToFreeMode(e) {
    const { editView } = this.props;
    if (!editView) return;
    // prevents selection of text and any other behavior from happening
    // once the block is being dragged!
    e.preventDefault();
    // the 3 main components, and the initial starting blocks of movement
    const block = e.target;
    const gridParent = e.currentTarget;
    const parentNode = block.parentNode;

    // First, we check 2 things:
    // is clicked block draggable or not draggable
    // and did the block got out of the grid at some point
    // if any of those cases occurred, just get block where it was before.
    const isOnDraggable = block.dataset.draggable;
    if (isOnDraggable === "false" || !isOnDraggable) return;
    if (e.target.className.includes("_isBlockFacade"))
      return this.turnToNormalMode(e);
    block.dataset.dragged = true;
    // then we give the drag context the id of the dragged block
    // and we also set the source and destination drag context blocks to the current parent
    // these will change while the block is moving
    // NOTE: the state is pushed downwards to the drag context children
    this.setState({
      draggedElem: block,
      isOnFreeMode: true,
      dragFrom: parentNode.dataset.dragcontextId,
      dragTo: parentNode.dataset.dragcontextId,
    });

    // oldParentId is used when dropping the block into a parent, the case is
    // when the block is dragged and dropped into the same parent, in that case
    // no new parent is added, thus just add the block to the old parent!
    if (!block.dataset.oldParentId) {
      block.dataset.oldParentId = parentNode.dataset.dragcontextId;
    }

    // we store all drag context parent positions, to check all
    // of those positions when the mouse moves, if on top of any of them
    // then change the destination drag to it, thus notifying the drag context
    // parent that it has a visitor.
    const dragContextPos = [];
    const allParents = [
      ...document.getElementsByClassName(parentNode.className),
    ];
    allParents.map((element) => {
      dragContextPos.push({
        elem: element,
        elemId: element.dataset.dragcontextId,
        pos: element.getBoundingClientRect(),
      });
    });

    // - isAbsolutePosition is a one use-case variable
    // used to add a facade only when the block is first dragged,
    // the facade is added just in place of the dragged block's initial position
    // - oldPos is the old child index when it was on the parent, also used to put the facade
    // on the same place of the block when dragged
    // - facade blocks... no need to explain anything here!
    let isAbsolutePos = false;
    const facadeBlock = block.cloneNode(true);
    const oldPos = [...parentNode.children].indexOf(block);
    block.style.height = "fit-content";
    const height = getComputedStyle(block, null).getPropertyValue("height");
    const width = getComputedStyle(block, null).getPropertyValue("width");

    // used to put block back on the old parent spot if no new parent
    this.setState({ facade: facadeBlock });
    facadeBlock.dataset.dragged = "";
    facadeBlock.className += " Block_isBlockFacade";
    // facadeBlock.style.height = height;
    // facadeBlock.style.width = width;
    facadeBlock.innerHTML = "";
    facadeBlock.dataset.isFacade = true;
    // set the initial position of the mouse, that is done to make the block
    // when being dragged just under the exact position the mouse dragged it from.
    const { clientX: oldMouseX, clientY: oldMouseY } = e;
    const { top, left } = block.getBoundingClientRect();
    const x = oldMouseX - left;
    const y = oldMouseY - top;
    // const x = left;
    // const y = top;
    document.body.onmousemove = (e) => {
      const { clientX: mouseX, clientY: mouseY } = e;
      if (!isAbsolutePos) {
        parentNode.insertBefore(facadeBlock, parentNode.children[oldPos]);
        block.style.position = "absolute";
        block.style.top = `${mouseY - y}px`;
        block.style.left = `${mouseX - x}px`;
        block.style.zIndex = 1;
        block.style.height = height;
        block.style.width = width;
        block.style.pointerEvents = "none";
        isAbsolutePos = true;
      }

      const {
        top: gridTop,
        left: gridLeft,
        bottom: gridBottom,
        right: gridRight,
      } = gridParent.getBoundingClientRect();

      // START OF BORDER POSITIONING
      // NOTE: change for to map if faced any stuttering!
      for (let index = 0; index < dragContextPos.length; index++) {
        const parent = dragContextPos[index];
        const {
          top: dragContextTop,
          left: dragContextLeft,
          bottom: dragContextBottom,
          right: dragContextRight,
        } = parent.pos;

        if (
          mouseY > dragContextTop &&
          mouseY < dragContextBottom &&
          mouseX < dragContextRight &&
          mouseX > dragContextLeft
        ) {
          document.querySelector(
            `[data-dragcontext-id="${parent.elemId}"]`
          ).dataset.isMouseOn = true;
          // this.createFacade(
          //   block,
          //   parent.elem,
          //   facadeBlock,
          //   [...parent.elem.children],
          //   {
          //     mouseX,
          //     mouseY,
          //   }
          // );
          this.setState({ dragTo: parent.elemId });
          break;
        } else {
          document.querySelector(
            `[data-dragcontext-id="${parent.elemId}"]`
          ).dataset.isMouseOn = "";
        }
      }

      if (
        mouseY <= gridTop ||
        mouseY >= gridBottom ||
        mouseX >= gridRight ||
        mouseX <= gridLeft
      ) {
        block.dataset.isOutOfGrid = true;
        return;
      }
      block.style.top = `${mouseY - y}px`;
      block.style.left = `${mouseX - x}px`;
    };
  }

  // createFacade(block, parentNode, facadeBlock, children, mousePos) {
  //   const { draggedElem } = this.state;
  //   // const { mouseX, mouseY } = mousePos;
  //   // const { isMouseOn } = parentNode.dataset;
  //   console.log(children);
  //   for (let index = 0; index < children.length; index++) {
  //     const child = children[index];
  //     if (facadeBlock !== child && draggedElem !== child) {
  //       child.onmousemove = (e) => {
  //         console.log("hovering on child: ", child.dataset.dragId);
  //         const holder = facadeBlock.style.gridRow;
  //         facadeBlock.style.gridRow = child.style.gridRow;
  //         child.style.gridRow = holder;
  //       };
  //       // const facadeHeight = getComputedStyle(child, null).getPropertyValue(
  //       //   "height"
  //       // );
  //       // const facadeWidth = getComputedStyle(child, null).getPropertyValue(
  //       //   "width"
  //       // );
  //       // block.style.height = facadeHeight;
  //       // block.style.height = facadeWidth;
  //       // console.log(child);
  //       // parentNode.insertBefore(facadeBlock, child);
  //       this.setState({ facade: facadeBlock });
  //     }
  //   }
  //   // [...children].map((child, indexOfFacade) => {
  //   //   const { top: childTop, bottom: childBottom } =
  //   //     child.getBoundingClientRect();
  //   //   if (
  //   //     draggedElem !== child &&
  //   //     facadeBlock !== child &&
  //   //     mouseY >= childTop &&
  //   //     mouseY <= childBottom
  //   //   ) {
  //   //     parentNode.insertBefore(facadeBlock, child);
  //   //     this.setState({ dropBeforeChild: child });
  //   //   }
  //   // });
  // }

  // TODO: Make positions of grid elements fixed once moving,
  // if element is at a position, swap the facade and the element,
  // then when dropped, replace facade with element

  turnToNormalMode(e) {
    const { facade } = this.state;
    const facadeBlocks = [...document.querySelectorAll(".Block_isBlockFacade")];
    const block = document.querySelector('[data-dragged="true"]');
    if (!block) return;
    const gridParent = e.currentTarget;
    const oldParent = document.querySelector(
      `[data-dragcontext-id="${block.dataset.oldParentId || 0}"]`
    );
    const insertIntoParent =
      document.querySelector('[data-is-mouse-on="true"]') || oldParent;

    this.setState({ isOnFreeMode: false });

    block.style.pointerEvents = "";
    block.style.gridRow = facade.style.gridRow;
    block.style.gridColumnStart = facade.style.gridColumnStart;
    facadeBlocks.map((elem) => {
      elem.remove();
    });
    gridParent.removeAttribute("style");
    oldParent.removeAttribute("style");
    // block.removeAttribute("style");
    block.style.position = "";
    block.style.top = "";
    block.style.left = "";
    block.style.width = "";
    block.style.height = "";
    block.style.zIndex = "";
    block.removeAttribute("data-dragged");
    block.removeAttribute("data-old-parent-id");

    // const { isOutOfGrid } = block.dataset;
    // const holder = block.style.gridRow;
    // block.style.gridRow = dropBeforeChild.style.gridRow;
    // dropBeforeChild.style.gridRow = holder;
    // console.log(dropBeforeChild);
    // childParent.insertBefore(block, dropBeforeChild);
    // if (isOutOfGrid) {
    // } else if (!insertIntoParent) {
    //   document.querySelectorAll("[data-dragcontext-id]")[0].appendChild(block);
    // } else {
    //   if (![...insertIntoParent.children].length) {
    //     insertIntoParent.appendChild(block);
    //   } else {
    //     childParent.insertBefore(block, dropBeforeChild);
    //   }
    // }

    insertIntoParent.removeAttribute("data-is-mouse-on");
    block.removeAttribute("data-is-out-of-grid");

    const currentParentChildren = [...insertIntoParent.children];

    let newId = 0;
    currentParentChildren.map((child) => {
      child.dataset.dragId = newId;
      child.onmousemove = null;
      newId++;
    });

    newId = null;

    document.body.onmousemove = null;

    // const parentClassName = e.target.className;
    // console.log(e.target);
    // const allParents = [...document.getElementsByClassName(parentClassName)];
    // allParents.map((element) => {
    //   // element.removeAttribute("style");
    //   element.onmouseenter = null;
    //   element.onmouseleave = null;
    // });
  }

  render() {
    const { children, editView } = this.props;
    const { isOnFreeMode, dragFrom, dragTo, draggedElem, facade } = this.state;
    return (
      <div
        className="grid-context"
        onMouseDownCapture={this.turnToFreeMode.bind(this)}
        onMouseUpCapture={this.turnToNormalMode.bind(this)}
      >
        {!children.length
          ? React.cloneElement(children, {
              isOnFreeMode,
              dragFrom,
              dragTo,
              draggedElem,
              facade,
              isGridUnlocked: editView,
            })
          : children.map((elem) =>
              React.cloneElement(elem, {
                isOnFreeMode,
                dragFrom,
                dragTo,
                draggedElem,
                facade,
              })
            )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridContextComponent);
