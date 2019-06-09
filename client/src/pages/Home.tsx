import React, { Component } from "react";
import Search from "../components/Search";

class Home extends Component<any, any> {
  render() {
    return (
      <div className="home-page">
        <div>ClassWatch.</div>
        <Search terms={this.props.terms} changeTerm={this.props.changeTerm} />
      </div>
    );
  }
}

export default Home;
