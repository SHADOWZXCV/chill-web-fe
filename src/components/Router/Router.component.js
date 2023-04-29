import PropTypes from "prop-types";
import React, { PureComponent, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "Components/Loading/Loading.component";
import withRouter from "Utils/wrappers/react-router/history";
import ProtectedRouteHOC from "Utils/ProtectedRoute";

export class RouterComponent extends PureComponent {
  static propTypes = {
    RouteComponentList: PropTypes.object.isRequired,
    navigate: PropTypes.func,
  };

  render() {
    const { RouteComponentList, navigate } = this.props;
    return (
      <Routes>
        {Object.keys(RouteComponentList).map((path, index) => {
          const { RouteComponent, isProtected } = RouteComponentList[path];

          return (
            <Route
              key={index}
              path={path}
              exact
              element={
                <Suspense fallback={<Loading isLoading={true} />}>
                  {
                    <ProtectedRouteHOC
                      isProtected={isProtected}
                      Route={
                        <RouteComponent
                          isProtected={isProtected}
                          navigate={navigate}
                        />
                      }
                    />
                  }
                </Suspense>
              }
            />
          );
        })}
      </Routes>
    );
  }
}

export default withRouter(RouterComponent);
