import React from "react";
import Cockpit from "../Cockpit/Cockpit";
import GameBoard from "../Gameboard/GameBoard";
import ProfilePage from '../auth/ProfilePage/ProfilePage';

const Game = () => (
  <div>
    game
    <Cockpit></Cockpit>
    <GameBoard></GameBoard>
    <ProfilePage></ProfilePage>
  </div>
);

export default Game;
