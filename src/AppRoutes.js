import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { PrivateRouter } from "./components/PrivateRoute/PrivateRouter";
import { PublicRouter } from "./components/PublicRouter/PublicRouter";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { Main } from "./pages/Main/Main";
import { NoMatch } from "./pages/NoMatch/NoMatch";
import { selectIsLoggedIn } from "./store/slices/auth";

export const AppRoutes = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Switch>
      <Route exact path="/">
        {isLoggedIn ? <Redirect to="/blog" /> : <Redirect to="/login" />}
      </Route>

      <PrivateRouter path="/blog" exact>
        <Main />
      </PrivateRouter>

      <PrivateRouter path="/favourite" exact>
        <Main />
      </PrivateRouter>

      <PrivateRouter path="/blog/:postId" exact>
        <Main />
      </PrivateRouter>

      <PrivateRouter path="/account" exact>
        <Main />
      </PrivateRouter>

      <PublicRouter path="/login" exact>
        <LoginPage />
      </PublicRouter>

      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};
