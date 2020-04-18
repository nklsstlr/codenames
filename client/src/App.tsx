import React, { useContext } from "react";

import Join from "./components/Join/Join";
import Lobby from "./components/Lobby/Lobby";
import Game from "./components/Game/Game";

import SignIn from "./components/auth/SignIn/SignIn";
import SignUp from "./components/auth/SignUp/SignUp";
import ProfilePage from "./components/auth/ProfilePage/ProfilePage";
import PasswordReset from "./components/auth/PasswordReset/PasswordReset";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UserContext } from "./providers/UserProvider";
import "./style.scss";

const App = () => {
  console.log("### " + process.env.ENV_CUSTOM_NAME);
  //const user = useContext(UserContext);
  const user = null;
  console.log("user is: " + user);
  return user ? (
    <ProfilePage />
  ) : (
    <Router>
      <Route path="/" exact component={Join} />

      {/* https://blog.logrocket.com/user-authentication-firebase-react-apps/ */}
      {/* <Route path="/" exact component={SignIn} />
      <Route path="/signUp" exact component={SignUp} />
      <Route path="/passwordReset" exact component={PasswordReset} /> */}

      <Route path="/lobby" component={Lobby} />
      <Route path="/game" component={Game} />
    </Router>
  );
};

export default App;
