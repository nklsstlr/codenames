import React, { useState, useEffect } from "react";
import SimpleUserTable from "./SimpleOnlinePlayerList";
import io from "socket.io-client";

type OnlinePlayersProps = {
  nameData: string;
};

let socket;
const OnlinePlayers = ({ nameData }: OnlinePlayersProps) => {
  console.log("nameData: " + nameData);
  const ENDPOINT = "http://localhost:3002";
  const [userData, setUserData] = useState([]);

  const [data, setData] = useState({ users: [], isFetching: false });

  useEffect(() => {
    socket = io(ENDPOINT);
    console.log("onlineUsers");
    socket.on("onlineUsers", ({ users }: any) => {
      console.log("socketio für onlineUsers: " + users);
      setUserData(users);
    });
  }, []);

  return (
    <div id="OnlinePlayerCompId">
      <SimpleUserTable users={userData} isFetching={data.isFetching} />
    </div>
  );
};

export default OnlinePlayers;
