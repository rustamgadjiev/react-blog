import "./App.scss";
import { useState } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import { PrivateRouter } from "./components/PrivateRoute/PrivateRouter";
import { PublicRouter } from "./components/PublicRouter/PublicRouter";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { Main } from "./pages/Main/Main";
import { NoMatch } from "./pages/NoMatch/NoMatch";

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/blog" /> : <Redirect to="/login" />}
        </Route>

        <PrivateRouter path="/blog" isLoggedIn={isLoggedIn} exact>
          <Main setIsLoggedIn={setIsLoggedIn} />
        </PrivateRouter>

        <PrivateRouter path="/favourite" isLoggedIn={isLoggedIn} exact>
          <Main setIsLoggedIn={setIsLoggedIn} />
        </PrivateRouter>

        <PrivateRouter path="/blog/:postId" isLoggedIn={isLoggedIn} exact>
          <Main setIsLoggedIn={setIsLoggedIn} />
        </PrivateRouter>

        <PublicRouter isLoggedIn={isLoggedIn} path="/login" exact>
          <LoginPage setIsLoggedIn={setIsLoggedIn} />
        </PublicRouter>

        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
};
