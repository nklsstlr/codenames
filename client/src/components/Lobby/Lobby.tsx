import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import queryString, { ParsedQuery } from "query-string";
import OnlinePlayersAutonomous from "../OnlinePlayersAutonomous/OnlinePlayersAutonomous";
import OnlinePlayersHoC from "../OnlinePlayersHoC/OnlinePlayersHoC";
import SimpleOnlinePlayerList from "../OnlinePlayersHoC/SimpleOnlinePlayerList";
import OnlinePlayersRenderProps from "../OnlinePlayersRenderProps/OnlinePlayersRenderProps";
import OnlinePlayersHooks from "../OnlinePlayersHooks/OnlinePlayersHooks";

const Lobby = ({ location }: { location: Location }) => {
  const { name }: any = queryString.parse(location.search).name;
  const ENDPOINT = "http://localhost:3002";

  useEffect(() => {
    var socket = io(ENDPOINT);

    //antony fragen wie ich objekt convert
    console.log("join");
    console.log(name);

    //Nochmaliger join führt zum disconnect davor
    socket.emit("join", { name }, (error: any) => {
      if (error) {
        alert(error);
      }
    });
    return () => {
      console.log("leaving room");
      socket.disconnect();
    };
  }, [ENDPOINT, { name }]);

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
      <OnlinePlayersHooks nameData={name}></OnlinePlayersHooks>
    </div>
  );
};

export default Lobby;