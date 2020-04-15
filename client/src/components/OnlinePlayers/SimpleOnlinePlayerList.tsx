import React from "react";
const SimpleOnlinePlayerList = (props: any) => {
  console.log(props);
  return (
    <div>
      <ul>
        {props.users.map((user: any) => (
          <li key={user.id}>
            <h3>{user.name}</h3>
          </li>
        ))}
      </ul>
      <p>{props.isFetching ? "Fetching users..." : ""}</p>
    </div>
  );
};
export default SimpleOnlinePlayerList;
