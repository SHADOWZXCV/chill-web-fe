import React, { PureComponent } from "react";
import { withFormHook } from "Utils/wrappers/formHook";
import MainAppComponent from "./MainApp.component";

export class MainApp extends PureComponent {
  render() {
    return <MainAppComponent {...this.props} />;
  }
}

export default withFormHook(MainApp);
