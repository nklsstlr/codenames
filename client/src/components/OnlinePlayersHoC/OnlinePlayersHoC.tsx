import React, { Component } from "react";
import SimpleUserTable from "./SimpleOnlinePlayerList";

type OnlinePlayersHoCState = {
  users: any[];
  isFetching: boolean;
  error: any | null;
};

//https://blog.logrocket.com/patterns-for-data-fetching-in-react-981ced7e5c56/
class OnlinePlayersHoC extends Component<{}, OnlinePlayersHoCState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isFetching: false,
      users: [],
      error: null,
    };
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
            isFetching: false,
            users: result.response,
          });
        },
        (error) => {
          this.setState({
            isFetching: true,
            error: error,
          });
        }
      );
  }
  render = () => (
    <SimpleUserTable
      users={this.state.users}
      isFetching={this.state.isFetching}
    />
  );
}
export default OnlinePlayersHoC;
