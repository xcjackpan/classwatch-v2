import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import "./App.css";

class App extends Component<any, any> {
  public render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/results/:term/:courseCode" component={Results} />
            <Route component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
