import React, { Component } from "react";
import Home from "./pages/Home";
import "./App.css";

class App extends Component<any, any> {
  public render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
