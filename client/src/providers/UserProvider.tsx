import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../firebase";

export const UserContext = createContext(
  {
    uid: "",
    email: "",
    displayName: "",
    photoURL: ""
  }
);

class UserProvider extends Component {
  state = {
    uid: "",
    email: "",
    displayName: "",
    photoURL: ""
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(async (userAuth) => {
      console.log("auth changed");
      const user = await generateUserDocument(userAuth);
      this.setState({ ...user });
    });
  };
  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;
