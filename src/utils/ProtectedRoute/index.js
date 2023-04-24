import React from "react";
import isSignedIn from "Utils/isSignedIn";
import { Navigate } from "react-router-dom";

const ProtectedRouteHOC = function (props) {
  const { isProtected, Route } = props;

  return (isProtected && isSignedIn()) || !isProtected ? (
    Route
  ) : (
    <Navigate to="/enter" />
  );
};

export default ProtectedRouteHOC;
