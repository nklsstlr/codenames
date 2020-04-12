import React, { useState, useEffect } from "react";

const OnlinePlayersHoC = () => {
  const [apiData, setApiData] = useState({});
  console.log("test");

  async function fetchData() {
    const res = await fetch("http://localhost:3002");
    const message = await res.json();
    console.log(message.response);
    setApiData(message.response);
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <div>
      <h1>Online</h1>
      Online Players: Normal API-Call : {apiData.message}
    </div>
  );
};

export default OnlinePlayersHoC;
