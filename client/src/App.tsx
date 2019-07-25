import React, { Component } from "react";
import axios from "axios";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import Home from "./pages/Home";
import Results from "./pages/Results";
import { Modal, message } from "antd";
import HelpModal from "./components/HelpModal";
import StopWatchingModal from "./components/StopWatchingModal";
import "./App.css";

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      terms: [],
      currTerm: "",
      stopWatchingVisible: false,
      stopWatchingHash: "",
    };
  }

  componentDidMount() {
    axios.get("/terms/").then(res => {
      this.setState({ terms: res.data, currTerm: res.data[2] });
    });
  }

  changeTerm = (term: String) => {
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
      width: "40vw",
      onOk() {},
      maskClosable: true
    });
  };

  toggleStopWatching = () => {
    this.setState({ stopWatchingVisible: !this.state.stopWatchingVisible, stopWatchingHash: "" })
  }

  submitStopWatching = () => {
    axios
      .delete(`/remove/${this.state.stopWatchingHash}`)
      .then(res => {
        this.toggleStopWatching();
        if (res.status === 200) {
          message.success('Course unwatched');
        } else {
          message.error('An error occurred');
        }
      })
  }

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
        <StopWatchingModal
          bodyStyle={{
            width: "40vw",
          }}
          maskClosable={true}
          visible={this.state.stopWatchingVisible}
          title="How should we notify you?"
          onOk={()=>{this.submitStopWatching()}}
          onCancel={this.toggleStopWatching.bind(this)}
          onChange={(e: any) => {
            this.setState({ stopWatchingHash: e });
          }}
          value={this.state.value}
        />
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
                  stopWatching={this.toggleStopWatching}
                />
              )}
            />
            <Route
              render={() => (
                <Home
                  terms={this.state.terms}
                  changeTerm={this.changeTerm}
                  search={this.search}
                  help={this.toggleHelp}
                  stopWatching={this.toggleStopWatching}
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
