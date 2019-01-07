import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import RangePicker from "react-range-picker";
import TimePicker from "rc-time-picker";

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

  handleCreateEvent(start, end) {
    console.log(
      this.state.accessBlock.access_token,
      this.state.accessBlock.refresh_token
    );

    console.log(start, end);
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
        }) // body data type must match "Content-Type" header
      }
    );
  }

  handleDeleteEvent(start, end) {
    console.log(
      this.state.accessBlock.access_token,
      this.state.accessBlock.refresh_token
    );

    console.log(start, end);
    fetch(
      `${process.env.REACT_APP_API_URL}/deleteEvent/${
        process.env.REACT_APP_USER_ID
      }`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_token: this.state.accessBlock.access_token
        }) // body data type must match "Content-Type" header
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
                Create event for 01092019:00:00:00 to 01112019:00:00:00!
              </button>
              <button
                onClick={(start, end) =>
                  this.handleDeleteEvent(
                    "Wed Jan 09 2019 00:00:00 GMT-0700 (Mountain Standard Time)",
                    "Fri Jan 11 2019 00:00:00 GMT-0700 (Mountain Standard Time)"
                  )
                }
              >
                Delete event for 01092019:00:00:00 to 01112019:00:00:00!
              </button>
            </React.Fragment>
          )}
        </header>
      </div>
    );
  }
}

export default App;
