import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { selectIsLoggedIn } from "../../store/slices/auth";

export const PrivateRouter = ({
  path,
  children: Component,
  exact = false,
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
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
