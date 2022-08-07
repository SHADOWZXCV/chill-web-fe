import PropTypes from "prop-types";
import React, { PureComponent, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loading from "../Loading/Loading.component";

export default class RouterComponent extends PureComponent {
  static propTypes = {
    RouteComponentList: PropTypes.object.isRequired,
  };

  render() {
    const { RouteComponentList } = this.props;
    return (
      <Switch>
        <Suspense fallback={<Loading isLoading={true} />}>
          {Object.keys(RouteComponentList).map((path, index) => {
            const { RouteComponent, isProtected } = RouteComponentList[path];
            const protectiveProps = {};

            if (isProtected) protectiveProps.isProtected = isProtected;

            return (
              <Route
                key={index}
                path={path}
                exact
                render={(componentProps) => (
                  <RouteComponent {...componentProps} {...protectiveProps} />
                )}
              />
            );
          })}
        </Suspense>
      </Switch>
    );
  }
}
