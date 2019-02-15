import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Search from "./components/Search.jsx";
import RepoList from "./components/RepoList.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: "",
      username: null,
      id: null,
      url: null,
      avatar_url: null
    };
  }

  search(term) {
    console.log(`${term} was searched`);
    // TODO
  }
  getUser(username) {
    return fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        return response;
      });
  }
  async handleSubmit(e) {
    e.preventDefault();
    let user = await this.getUser(this.refs.username.value);
    this.setState({
      username: user.login,
      id: user.id,
      url: user.url,
      avatar_url: user.avatar_url
    });
  }
  render() {
    let user;
    if (this.state.username) {
      user = (
        <div>
          <img src={this.state.avatar_url} width="128" height="128" />
          <p>
            {this.state.username} <br />
            {this.state.id} <br />
            {this.state.url}
          </p>
        </div>
      );
    }

    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos} />
        <Search onSearch={this.search.bind(this)} />

        <form onSubmit={e => this.handleSubmit(e)}>
          <input ref="username" type="text" placeholder="username" />
          <button onClick={e => this.handleSubmit(e)}>Search</button>
        </form>
        <p>{user}</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
