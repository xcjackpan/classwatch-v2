import React, { Component } from "react";
import Search from "../components/Search";
import "./Home.css";

class Home extends Component<any, any> {
  render() {
    return (
      <div className="home-page">
        <div className="title">ClassWatch.</div>
        <Search
          home
          terms={this.props.terms}
          changeTerm={this.props.changeTerm}
          search={this.props.search}
        />
      </div>
    );
  }
}

export default Home;
