import React, { Component } from "react";
import axios from "axios";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
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

  search = (searchString: string) => {
    history.push(`/results/${this.state.currTerm}/${searchString}`);
  };

  public render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route path="/results/:term/:courseCode" component={Results} />
            <Route
              render={() => (
                <Home
                  terms={this.state.terms}
                  changeTerm={this.changeTerm}
                  search={this.search}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
