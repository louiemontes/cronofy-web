import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    accessToken: "",
    data: ""
  };

  //https://cronofy-api.herokuapp.com/cronofy-auth
  //localhost:8080

  componentDidMount() {
    
    (async () => {
      const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/passwords`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
        //credentials: "include",
        //  mode: "no-cors"
      });
      const content = await rawResponse.json();
      console.log(content);
    })();

    
    

    try {
      fetch(`${process.env.REACT_APP_API_URL}/show-user`, {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(json => this.setState({ data: json }))
        .catch(err => console.error(err));
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const authLink = `${process.env.REACT_APP_API_URL}/cronofy-auth`;
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
        </header>
      </div>
    );
  }
}

export default App;
