import React, { Component } from "react";
import Search from "../components/Search";
import "./Home.css";

class Home extends Component<any, any> {
  render() {
    return (
      <div className="home-page">
        <div className="title">ClassWatch.</div>
        <Search
          terms={this.props.terms}
          changeTerm={this.props.changeTerm}
          home
        />
      </div>
    );
  }
}

export default Home;
