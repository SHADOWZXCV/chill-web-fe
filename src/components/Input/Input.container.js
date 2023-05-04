import React, { PureComponent } from "react";
import InputComponent from "./Input.component";

export class Input extends PureComponent {
  render() {
    return <InputComponent {...this.containerFunctions} {...this.props} />;
  }
}

export default Input;
