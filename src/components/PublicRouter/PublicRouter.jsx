import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

export const PublicRouter = ({
  isLoggedIn,
  exact = false,
  path,
  children: Component,
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        if (!isLoggedIn) return Component;
        return <Redirect to="/" />;
      }}
    />
  );
};
