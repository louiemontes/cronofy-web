import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    accessBlock: undefined
  };

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_API_URL}/show-user/${
        process.env.REACT_APP_USER_ID
      }`,
      {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      }
    )
      .then(rawAccess => rawAccess.json())
      .then(accessClean => accessClean[0])
      .then(singleAccess => this.setState({ accessBlock: singleAccess }))
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const authLink = `${process.env.REACT_APP_API_URL}/cronofy-auth/${
      process.env.REACT_APP_USER_ID
    }`;

    const { accessBlock } = this.state;
    accessBlock && console.log(this.state.accessBlock);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>THIS {process.env.REACT_APP_API_URL}</p>
          <p>
            <a className="App-link" href={authLink} rel="noopener noreferrer">
              Click to get access token.
            </a>
          </p>
          {accessBlock && (
            <button onClick={() => console.log("make something soon!")}>
              Create event
            </button>
          )}
        </header>
      </div>
    );
  }
}

export default App;
