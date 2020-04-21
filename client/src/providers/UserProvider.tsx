import React, { Component, createContext, useState, useEffect } from "react";
import { auth, generateUserDocument } from "../firebase";

export const UserContext = createContext({
  uid: "",
  email: "",
  displayName: "",
  photoURL: "",
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    uid: "",
    email: "",
    displayName: "",
    photoURL: "",
  });

  //useEffect
  useEffect(() => {
    console.log("useEffect has been called!");
    auth.onAuthStateChanged(async (userAuth) => {
      console.log("auth changed");
      const user = await generateUserDocument(userAuth);
      setUser({ ...user });
    });
  }, []); //Pass Array as second argument

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export default UserProvider;
