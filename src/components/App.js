import React, { PureComponent } from "react";
import Router from "./Router";

export default class App extends PureComponent {
  render() {
    const { pathname } = window.location;
    return <Router path={pathname} />;
  }
}
