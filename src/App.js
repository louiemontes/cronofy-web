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
      .then(singleAccess => this.setState({ accessBlock: "singleAccess" }))
      .catch(error => {
        console.log(error);
      });
  }

  handleCreateEvent(start, end) {
    fetch(
      `${process.env.REACT_APP_API_URL}/createEvent/${
        process.env.REACT_APP_USER_ID
      }`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_token: this.state.accessBlock.access_token,
          start: start,
          end: end
        })
      }
    );
  }

  handleDeleteEvent(start, end) {
    fetch(
      `${process.env.REACT_APP_API_URL}/deleteEvent/${
        process.env.REACT_APP_USER_ID
      }`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_token: this.state.accessBlock.access_token
        })
      }
    );
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
            {!this.state.accessBlock && (
              <a className="App-link" href={authLink} rel="noopener noreferrer">
                Click to get access token.
              </a>
            )}
          </p>
          {accessBlock && (
            <React.Fragment>
              <button
                onClick={(start, end) =>
                  this.handleCreateEvent(
                    "Sat Jan 12 2019 00:00:00 GMT-0700 (Mountain Standard Time)",
                    "Sat Jan 12 2019 00:30:00 GMT-0700 (Mountain Standard Time)"
                  )
                }
              >
                Create event for Sat Jan 12 2019 00:00:00 GMT-0700 (Mountain
                Standard Time) to Sat Jan 12 2019 00:30:00 GMT-0700 (Mountain
                Standard Time)!
              </button>
              <button
                onClick={(start, end) =>
                  this.handleDeleteEvent(
                    "Sat Jan 12 2019 00:00:00 GMT-0700 (Mountain Standard Time)",
                    "Sat Jan 12 2019 00:30:00 GMT-0700 (Mountain Standard Time)"
                  )
                }
              >
                Delete event for Sat Jan 12 2019 00:00:00 GMT-0700 (Mountain
                Standard Time) to Sat Jan 12 2019 00:30:00 GMT-0700 (Mountain
                Standard Time)!
              </button>
            </React.Fragment>
          )}
        </header>
      </div>
    );
  }
}

export default App;
