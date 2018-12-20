import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import list from "./components/list";
import { Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    axios.get("/auth/user-data").then(res => {
      console.log(res.data.user);
      this.setState({
        user: res.data.user
      });
    });
  }

  login() {
    const redirectUri = encodeURIComponent(
      window.location.origin + "/auth/callback"
    );
    window.location = `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/authorize?client_id=${
      process.env.REACT_APP_AUTH0_CLIENT_ID
    }&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
  }

  render() {
    return (
      <div>
        <div className="loginBtnContainer">
          <button className="loginButton" onClick={this.login}>
            Log In
          </button>
        </div>
        <Route path="/" component={list} />
      </div>
    );
  }
}

export default App;
