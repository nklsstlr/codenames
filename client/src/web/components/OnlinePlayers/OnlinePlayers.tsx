import React, { useState, useEffect, useContext } from "react";
import SimpleUserTable from "./SimpleOnlinePlayerList";
import io from "socket.io-client";
import { SocketContext } from "../../providers/SocketProvider";

type OnlinePlayersProps = {
  nameData: string;
};

let socket;
const OnlinePlayers = ({ nameData }: OnlinePlayersProps) => {
  const socket: SocketIOClient.Socket = useContext(SocketContext);
  console.log("nameData: " + nameData);
  const [userData, setUserData] = useState([]);

  const [data, setData] = useState({ users: [], isFetching: false });

  useEffect(() => {
    console.log("OnlinePlayerComp.: onlineUsers");
    socket.on("onlineUsers", ({ users }: any) => {
      console.log("socketio für onlineUsers: " + users);
      setData({ users: users, isFetching: false });
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setData({ users: data.users, isFetching: true });
        const result = await callAPI();
        console.log("### new call" + result);
        setData({ users: result.response, isFetching: false });
      } catch (e) {
        console.log(e);
        setData({ users: data.users, isFetching: false });
      }
    };
    fetchUsers();
  }, []);

  return (
    <div id="OnlinePlayerCompId">
      <SimpleUserTable users={data.users} isFetching={data.isFetching} />
    </div>
  );
};
async function callAPI() {
  const res = await fetch("http://localhost:3002/users").then((res) =>
    res.json()
  );
  return res;
}
export default OnlinePlayers;
