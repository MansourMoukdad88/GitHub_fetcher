import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
//import { Navbar } from "react-bootstrap";
import $ from "jquery";
//import "./main.css";
import Search from "./components/Search.jsx";
import RepoList from "./components/RepoList.jsx";
import ListView from "./components/ListView.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      repos: []
    };
  }

  search(term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      type: "POST",
      url: "/repos",
      contentType: "application/json",
      data: JSON.stringify({ username: term }),
      success: data => {
        console.log(data);
        this.setState({ repos: data });
      }
    });
  }
  getUser(username) {
    return fetch(
      `https://api.github.com/users/${username}`
      //`https://api.github.com/users/${username}/repos`
    )
      .then(response => response.json())
      .then(response => {
        console.log("FETCH user from client", response);
        return response;
      });
  }
  getUserRepo(username) {
    return fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(response => {
        return response;
      });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { value } = this.refs.username;
    let user = await this.getUser(value);
    let repos = await this.getUserRepo(value);

    this.setState({
      user: {
        avatar_url: user.avatar_url,
        username: user.login,
        followers: user.followers,
        following: user.following,
        url: user.url,
        public_repos: user.public_repos
      },
      repos
    });
  }

  renderRepos(repos) {
    return repos.map(item => {
      return (
        <div key={item.id} className="repoResults">
          <p>{item.name}</p>
        </div>
      );
    });
  }

  renderUser(user) {
    return (
      <div className="resultBadge">
        <img src={user.avatar_url} width="128" height="128" />
        <p className="userInfo">
          Username: <br />
          {user.username}
        </p>
        <p className="followerInfo">{user.followers} Followers</p>
        <p className="followingInfo">Following {user.following} users</p>
      </div>
    );
  }

  render() {
    const { user, repos } = this.state;
    return (
      <div className="GitHubSearch">
        <header className="Search-header">
          <h1 className="header1">Github Fetcher</h1>
          <h2>Github User Search </h2>
        </header>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input ref="username" type="text" placeholder="username" />
        </form>
        <div className="Search-intro">
          <h4> User info: </h4>
          {user && this.renderUser(user)}
        </div>
        <div>
          <RepoList repos={this.state.repos} />
          <ListView repos={this.state.repos} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
