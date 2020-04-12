import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import OnlinePlayersAutonomous from "../OnlinePlayersAutonomous/OnlinePlayersAutonomous";

const Lobby = ({ location }) => {
  const { name } = queryString.parse(location.search);
  return (
    <div>
      <h2>HALLO {name}</h2>
      lobby
      <ul>
        <Link to={`/game?name=${name}&room=$1`}>
          <li>Room 1</li>
        </Link>
        <Link to={`/game?name=${name}&room=$2`}>
          <li>Room 2</li>
        </Link>
        <Link to={`/game?name=${name}&room=$3`}>
          <li>Room 3</li>
        </Link>
      </ul>
      <OnlinePlayersAutonomous></OnlinePlayersAutonomous>
    </div>
  );
};

export default Lobby;
