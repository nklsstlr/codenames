import React, { useContext } from "react";
import { UserContext } from "./../../providers/UserProvider";
import Link from "@material-ui/core/Link";

const NavigationBar = () => {
  const user = useContext(UserContext);

  return (
    <div>
      <Link href="/"> Home </Link>
      Navbar User is {user.email}
      <Link href="/profile"> Profile</Link>
    </div>
  );
};

export default NavigationBar;
