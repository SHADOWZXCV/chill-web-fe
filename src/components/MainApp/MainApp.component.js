import React, { PureComponent } from "react";
import Themable from "../Themable";
import Moon from "Components/Icons/Moon";
import GridContext from "../GridContext";
import DragContext from "../DragContext";
import Draggable from "../Draggable";
// import getBlocks from "../../query/Blocks/Blocks.query";
import "./MainApp.style.scss";
// import GridContext from "../.GridContext";
import Gears from "../Icons/Gears";

export class MainAppComponent extends PureComponent {
  // state = {
  //   blocks: getBlocks(),
  // };

  // handleOnDragEnd(result) {
  //   if (!result.destination) return;
  //   console.log(result);
  //   const { blocks } = this.state;
  //   const items = [...blocks];
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);

  //   this.setState({ blocks: items });
  // }

  // componentDidUpdate() {
  //   console.log("blocks after: ", this.state.blocks);
  // }

  renderDragDropContext() {
    // startRow, takeHowManyRows, startColumn
    const dragContextElementsPos = ["1,3,1", "3,7,1", "1,5,2", "5,7,2"];

    return (
      <GridContext>
        <DragContext
          dragContextElementsPos={dragContextElementsPos}
          gridSize={[7, 2]}
          dropId={0}
          className="main-drag"
        >
          <Draggable dragId={0}>
            <h2 className="BlockHead">Notification & emails</h2>
            <div className="Block Block-Noti">
              <p>what 1</p>
              <p>what 1</p>
              <p>what 1</p>
            </div>
          </Draggable>
          <Draggable dragId={1}>
            <h2 className="BlockHead">Reminders</h2>
            <div className="Block Block-Meetings_isNested">
              <p>what 1</p>
              <p>what 1</p>
              <p>what 1</p>
              <p>what 1</p>
              <p>what 1</p>
              <p>what 1</p>
              <p>what 1</p>
              <p>what 1</p>
              <p>what 1</p>
            </div>
            {/* <div className="NestedDraggableContainer">
              <h2 className="BlockHead">Meetings</h2>
              <div className="Block Block-Reminders_isNested">
                <p>what 1</p>
                <p>what 1</p>
                <p>what 1</p>
              </div>
            </div> */}
          </Draggable>
          {/* <Draggable dragId={2}>
            <h2 className="BlockHead">TODAY'S TODO LIST</h2>
            <div className="Block Block-ToDo">
              <p>what 1</p>
              <p>what 1</p>
              <p>what 1</p>
              <p>what 1</p>
              <p>what 1</p>
              <p>what 1</p>
              <p>what 1</p>
              <p>what 1</p>
            </div>
          </Draggable>
          <Draggable dragId={3}>
            <h2 className="BlockHead">DAILY ROUTINE</h2>
            <div className="Block Block-Routines">
              <p>what 1</p>
              <p>what 1</p>
            </div>
          </Draggable> */}
        </DragContext>
      </GridContext>
    );
  }

  render() {
    return (
      <Themable>
        <nav className="MainApp-Nav">
          <Moon />
          <Gears />
        </nav>
        {this.renderDragDropContext()}
      </Themable>
    );
  }
}

export default MainAppComponent;
