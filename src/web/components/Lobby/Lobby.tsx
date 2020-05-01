import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import queryString, { ParsedQuery } from "query-string";
import OnlinePlayersAutonomous from "../examples/OnlinePlayersAutonomous/OnlinePlayersAutonomous";
import OnlinePlayersHoC from "../examples/OnlinePlayersHoC/OnlinePlayersHoC";
import SimpleOnlinePlayerList from "../examples/OnlinePlayersHoC/SimpleOnlinePlayerListHoC";
import OnlinePlayersRenderProps from "../examples/OnlinePlayersRenderProps/OnlinePlayersRenderProps";
import OnlinePlayers from "../OnlinePlayers/OnlinePlayers";
import { UserContext } from "../../providers/UserProvider";
import { SocketContext } from "../../providers/SocketProvider";

const Lobby = ({ location }: { location: Location }) => {
  const socket: SocketIOClient.Socket = useContext(SocketContext);
  const query = queryString.parse(location.search);

  const ENDPOINT = "http://localhost:3002";

  return (
    <div>
      <h2>HALLO_neu{name}</h2>
      Lobby
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
      <OnlinePlayers nameData={name}></OnlinePlayers>
    </div>
  );
};

export default Lobby;
