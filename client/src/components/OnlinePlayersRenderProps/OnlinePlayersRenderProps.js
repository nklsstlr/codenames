import React, { Component } from "react";

//https://blog.logrocket.com/patterns-for-data-fetching-in-react-981ced7e5c56/
class OnlinePlayersRenderProps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      users: [],
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
  render = () => this.props.children(this.state);
}
export default OnlinePlayersRenderProps;
