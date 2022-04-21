import PropTypes from "prop-types";
import { PureComponent } from "react";

export default class RouterComponent extends PureComponent {
  static propTypes = {
    Route: PropTypes.string.isRequired,
  };

  render() {
    const { Route } = this.props;
    return Route;
  }
}
