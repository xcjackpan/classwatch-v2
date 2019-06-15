import React, { Component } from "react";
import { Button } from "antd";
import ResultsRow from "./ResultsRow";
import "./ResultsTable.css";
import { IParsedResults } from "../types";
import { parseTerm } from "../utils";
import { IResultsTableProps } from "../types";
import axios from "axios";

class ResultsTable extends Component<any, any> {
  constructor(props: IResultsTableProps) {
    super(props);
    this.state = {
      checked: []
    };
  }

  private submit() {
    //Modal first
    axios.post("http://localhost:3001/watch/", {
      data: this.state.checked
    });
  }

  public update(section: string, add: boolean): void {
    if (add) {
      this.setState({ checked: [...this.state.checked, section] });
    } else {
      this.setState({
        checked: this.state.checked.filter((elem: string) => elem !== section)
      });
    }
  }

  render() {
    console.log(this.state.checked);
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
              <ResultsRow
                key={elem.section}
                row={elem}
                update={this.update.bind(this)}
              />
            ))}
          </tbody>
        </table>
        <Button
          id="watch"
          type="primary"
          size="large"
          shape="round"
          onClick={this.submit.bind(this)}
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default ResultsTable;
