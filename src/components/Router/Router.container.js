import React, { PureComponent } from "react";
import RouterComponent from "./Router.component";

import RoutesList from "../../routes/RoutesList/RoutesList";
import { BrowserRouter as Router } from "react-router-dom";

export class RouterContainer extends PureComponent {
  render() {
    return (
      <Router>
        <RouterComponent RouteComponentList={RoutesList} />
      </Router>
    );
  }
}

export default RouterContainer;
