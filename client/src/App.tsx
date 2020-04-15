import React from "react";

import Join from "./components/Join/Join";
import Lobby from "./components/Lobby/Lobby";
import Game from "./components/Game/Game";

import { BrowserRouter as Router, Route } from "react-router-dom";
import OnlinePlayers from "./components/OnlinePlayersAutonomous/OnlinePlayersAutonomous";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/lobby" component={Lobby} />
      <Route path="/game" component={Game} />
    </Router>
  );
};

export default App;
