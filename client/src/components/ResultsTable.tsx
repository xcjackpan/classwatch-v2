import React, { Component } from "react";
// import { Table } from "antd";
import ResultsRow from "./ResultsRow";
import "./ResultsTable.css";
import { IParsedResults } from "../types";

class ResultsTable extends Component<any, any> {
  render() {
    return (
      <div className="results-container">
        <table>
          <thead>
            <tr>
              <th>WATCH</th>
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
