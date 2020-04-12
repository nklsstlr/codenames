import React, { useState, useEffect } from "react";

class OnlinePlayersAutonomous extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchUsers();
    this.timer = setInterval(() => this.fetchUsers(), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
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
