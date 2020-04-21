import React, { useContext } from "react";
import { UserContext } from "./../../providers/UserProvider";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const user = useContext(UserContext);

  return (
    <div>
      Navbar User is {user.email}
      <Link to={`/profile`}> Profile</Link>
    </div>
  );
};

export default NavigationBar;
