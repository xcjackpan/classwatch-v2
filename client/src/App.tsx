import React, { Component } from "react";
import axios from "axios";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import Home from "./pages/Home";
import Results from "./pages/Results";
import { Modal } from "antd";
import HelpModal from "./components/HelpModal";
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
    console.log(this.state.terms)
    this.setState({ currTerm: term });
  };

  search = (searchString: string) => {
    history.push(`/results/${this.state.currTerm}/${searchString}`);
  };

  toggleHelp = () => {
    Modal.info({
      icon: "question-circle",
      title: "Help!",
      content: <HelpModal />,
      onOk() {},
      maskClosable: true
    });
  };

  getSeason = (term: string) => {
    switch (term ? term.charAt(3) : "") {
      case "1":
        return "winter";
      case "5":
        return "spring";
      default:
        return "fall";
    }
  }

  public render() {
    return (
      <div className={`App ${this.getSeason(this.state.currTerm)}`}>
        <Router history={history}>
          <Switch>
            <Route
              path="/results/:term/:courseCode"
              render={props => (
                <Results
                  {...props}
                  terms={this.state.terms}
                  changeTerm={this.changeTerm}
                  search={this.search}
                  help={this.toggleHelp}
                />
              )}
            />
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
