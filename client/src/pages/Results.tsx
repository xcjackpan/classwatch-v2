import React, { Component } from "react";
import Search from "../components/Search";

class Results extends Component<any, any> {
  componentDidMount() {
    const aaa = this.props.match.params;

    console.log(aaa);
  }
  render() {
    return (
      <div className="results-page">
        <div>ClassWatch.</div>
        <Search />
        RESULTSSSSSSSS
      </div>
    );
  }
}

export default Results;
