import React, { useState, useEffect } from "react";

type OnlinePlayersAutonomousState = {
  users: any[];
  isLoaded: boolean;
  error: any | null;
};

class OnlinePlayersAutonomous extends React.Component<
  {},
  OnlinePlayersAutonomousState
> {
  constructor(props: any) {
    super(props);
  }
  //Bug: https://stackoverflow.com/questions/45802988/typescript-use-correct-version-of-settimeout-node-vs-window
  private _timerId: any;

  componentDidMount() {
    this.fetchUsers();
    this._timerId = setInterval(() => this.fetchUsers(), 5000);
  }
  componentWillUnmount() {
    clearInterval(this._timerId);
    this._timerId = null;
  }

  fetchUsers() {
    fetch("http://localhost:3002/users")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            users: result.response,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, users } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log(this.state.users);
      return (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <h3>{user.name}</h3>
            </li>
          ))}
        </ul>
      );
    }
  }
}
export default OnlinePlayersAutonomous;
