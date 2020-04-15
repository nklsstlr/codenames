import React, { useState, useEffect } from "react";
import SimpleUserTable from "../OnlinePlayersHoC/SimpleOnlinePlayerListHoC";

const OnlinePlayersHooks = () => {
  const [data, setData] = useState({ users: [], isFetching: false });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setData({ users: data.users, isFetching: true });
        const result = await callAPI();
        console.log(result);
        setData({ users: result.response, isFetching: false });
      } catch (e) {
        console.log(e);
        setData({ users: data.users, isFetching: false });
      }
    };
    fetchUsers();
    setInterval(() => fetchUsers(), 5000);
  }, []);

  async function callAPI() {
    const res = await fetch("http://localhost:3002/users").then((res) =>
      res.json()
    );
    return res;
  }

  return <SimpleUserTable users={data.users} isFetching={data.isFetching} />;
};

export default OnlinePlayersHooks;
