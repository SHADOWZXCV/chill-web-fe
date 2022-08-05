import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import RouterComponent from "./Router.component";

import RoutesList from "../../routes/RoutesList/RoutesList";
import { Router } from "react-router-dom";
import history from "../../utils/History";

export class RouterContainer extends PureComponent {
  static propTypes = {
    path: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Router history={history}>
        <RouterComponent RouteComponentList={RoutesList} />
      </Router>
    );
  }
}

export default RouterContainer;
