import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import "./App.css";

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      terms: [],
      currTerm: ""
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3001/terms/").then(res => {
      this.setState({ terms: res.data, currTerm: res.data[2] });
    });
  }

  changeTerm = (term: String) => {
    this.setState({ currTerm: term });
  };

  public render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              path="/results/:term/:courseCode"
              render={props => (
                <Results
                  terms={this.state.terms}
                  changeTerm={this.changeTerm}
                  {...props}
                />
              )}
            />
            <Route
              render={() => (
                <Home terms={this.state.terms} changeTerm={this.changeTerm} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
