import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
//import { nav } from "bootstrap";
import $ from "jquery";
import Search from "./components/Search.jsx";
import RepoList from "./components/RepoList.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      username: null,
      id: null,
      url: null,
      avatar_url: null,
      followers: null,
      following: null,
      created_at: null,
      public_repos: null
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
        console.log(response);
        return response;
      });
  }
  async handleSubmit(e) {
    let username;
    e.preventDefault();
    let user = await this.getUser(this.refs.username.value);
    this.setState({
      username: user.login,
      id: user.id,
      url: user.url,
      avatar_url: user.avatar_url,
      followers: user.followers,
      following: user.following,
      created_at: user.created_at,
      public_repos: user.public_repos
    });
  }
  render() {
    let user;
    if (this.state.username) {
      user = (
        <div>
          <img src={this.state.avatar_url} width="128" height="128" />
          <p>
            <span>Username:</span>
            {this.state.username} <br />
            <span>ID:</span> {this.state.id}
            <br />
            <span>URL:</span>
            {this.state.url}
            <br />
            <span>Followers:</span> {this.state.followers}
            <br />
            <span>Following:</span> {this.state.following}
            <br />
            <span>Created At:</span> {this.state.created_at}
            <br />
            <span>Public Repos:</span> {this.state.public_repos}
          </p>
        </div>
      );
    }

    return (
      <div>
        <header>
          <h1>Github Fetcher</h1>
        </header>
        <RepoList repos={this.state.repos} />
        <Search onSearch={this.search.bind(this)} />

        <form onSubmit={e => this.handleSubmit(e)}>
          Enter a github username:
          <input ref="username" type="text" placeholder="username" />
          <button onClick={e => this.handleSubmit(e)}>Search</button>
        </form>
        <p>{user}</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
