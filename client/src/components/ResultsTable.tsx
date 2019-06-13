import React, { Component } from "react";
// import { Table } from "antd";
import ResultsRow from "./ResultsRow";
import "./ResultsTable.css";
import { IParsedResults } from "../types";
import { parseTerm } from "../utils";

class ResultsTable extends Component<any, any> {
  render() {
    let courseCode: string = "Nothing found :(";
    let courseTitle: string = "Nothing found :(";
    if (this.props.results[0]) {
      courseCode = this.props.results[0].courseCode;
      courseTitle = this.props.results[0].courseTitle;
    }
    return (
      <div id="results-container">
        <div id="results-title">
          <span id="course-code">{courseCode}</span>
          <span id="course-title">
            {courseTitle} &nbsp;|&nbsp; {parseTerm(this.props.term)}
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Watch</th>
              <th>Section</th>
              <th>Instructor</th>
              <th>Days</th>
              <th>Time</th>
              <th>Location</th>
              <th>Spots</th>
            </tr>
          </thead>
          <tbody>
            {this.props.results.map((elem: IParsedResults) => (
              <ResultsRow row={elem} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ResultsTable;
