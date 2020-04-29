import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignIn from "./components/auth/SignIn/SignIn";
import { UserContext } from "./providers/UserProvider";
import Game from "./components/Game/Game";
import Lobby from "./components/Lobby/Lobby";
import SignUp from "./components/auth/SignUp/SignUp";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import LandingPage from "./components/LandingPage/LandingPage";
import PasswordReset from "./components/auth/PasswordReset/PasswordReset";
import ProfilePage from "./components/auth/ProfilePage/ProfilePage";
import { createBrowserHistory } from "history";
import { auth } from "./firebase";
import Join from "./components/Join/Join";
export default function AuthExample() {
  const history = createBrowserHistory();
  console.log("historypath: " + history.location.pathname);
  return (
    <Router>
      <div>
        <NavigationBar></NavigationBar>

        {history.location.pathname === "/" && <LandingPage />}

        <Switch>
          <Route path="/SignIn" component={SignIn} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/passwordReset" exact component={PasswordReset} />
          <Route path="/Join" exact component={Join} />
          <PrivateRoute component={Game} path="/game" />
          <PrivateRoute component={Lobby} path="/lobby" />
          <PrivateRoute component={ProfilePage} path="/profile" />
        </Switch>
      </div>
    </Router>
  );
}

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const user = useContext(UserContext);
  console.log("###");
  console.log(auth.currentUser);
  console.log(user.uid + user.email);
  return (
    <Route
      {...rest}
      render={(props) =>
        user.email ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/SignIn",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
