import React, { useState, useEffect } from "react";
import SimpleUserTable from "../OnlinePlayersHoC/SimpleOnlinePlayerList";
import io from "socket.io-client";

let socket;
const OnlinePlayersHooks = ({ nameData }) => {
  console.log("nameData: " + nameData);
  const ENDPOINT = "http://localhost:3002";
  const [userData, setUserData] = useState([]);

  const [data, setData] = useState({ users: [], isFetching: false });

  useEffect(() => {
    socket = io(ENDPOINT);
    console.log("onlineUsers");
    socket.on("onlineUsers", ({ users }) => {
      console.log("socketio für onlineUsers: " + users);
      setUserData(users);
    });
  }, []);

  return <SimpleUserTable users={userData} isFetching={data.isFetching} />;
};

export default OnlinePlayersHooks;
