import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import RouterComponent from "./Router.component";

import RoutesList from "../../routes/RoutesList/RoutesList";

export class RouterContainer extends PureComponent {
  static propTypes = {
    path: PropTypes.string.isRequired,
  };

  checkRoute() {
    const { path } = this.props;
    switch (path) {
      case "/":
        return <RoutesList.Home />;
      case "/signin":
        return <RoutesList.Login />;
      case "/signup":
        return <RoutesList.Signup />;
      default:
        break;
    }
  }

  render() {
    return <RouterComponent Route={this.checkRoute()} />;
  }
}
