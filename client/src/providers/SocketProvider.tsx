import React, { Component, createContext, useState, useEffect } from "react";

import io from "socket.io-client";

export const SocketContext = createContext({});
const ENDPOINT = "http://localhost:3002";

const SocketProvider = ({ children }) => {
  const socket = io(ENDPOINT);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
export default SocketProvider;
