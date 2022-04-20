import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

export const PrivateRouter = ({
  path,
  children: Component,
  isLoggedIn,
  exact = false,
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        if (isLoggedIn) return Component;
        return <Redirect to="/login" />;
      }}
    />
  );
};
