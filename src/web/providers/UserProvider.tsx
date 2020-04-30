import React, {
  Component,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { auth, generateUserDocument } from "../firebase";
import { useLocalStorage } from "./../helpers/hooks/useLocalStorage";
import { SocketContext } from "./SocketProvider";

export const UserContext = createContext({
  uid: "",
  email: "",
  displayName: "",
  photoURL: "",
});

const UserProvider = ({ children }) => {
  const socket: SocketIOClient.Socket = useContext(SocketContext);
  const [user, setUser] = useLocalStorage("currentUser", {
    uid: "",
    email: "",
    displayName: "",
    photoURL: "",
  });
  var name = "niklasfest";
  //useEffect
  useEffect(() => {
    console.log("useEffect has been called!");
    auth.onAuthStateChanged(async (userAuth) => {
      console.log("auth changed");
      const user = await generateUserDocument(userAuth);
      setUser({ ...user });
      name = user.email;
      socket.emit("join", name, (error: any) => {
        if (error) {
          alert(error);
        }
      });
    });
  }, []);

  //Pass Array as second argument

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export default UserProvider;
