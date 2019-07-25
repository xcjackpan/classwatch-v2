import React, { Component } from "react";
import { Button, message } from "antd";
import ResultsRow from "./ResultsRow";
import "./ResultsTable.css";
import { IParsedResults } from "../types";
import { parseTerm } from "../utils";
import { IResultsTableProps } from "../types";
import SubmitModal from "./SubmitClassesModal";
import axios from "axios";

class ResultsTable extends Component<any, any> {
  constructor(props: IResultsTableProps) {
    super(props);
    this.state = {
      checked: [],
      email: "",
      submitDialogVisible: false,
      emailError: false,
    };
  }

  private submit = () => {
    if (this.validEmail(this.state.email)) {
      axios.post("/watch/", {
        course: this.props.results[0].courseCode,
        sections: this.state.checked,
        email: this.state.email,
      }).then((res) => {
        this.toggleSubmitDialog();
        message.success('Verification email sent');
      });
    } else {
      this.setState({emailError: true});
    }
  }

  private toggleSubmitDialog = () => {
    this.setState({submitDialogVisible: !this.state.submitDialogVisible, emailError: false});
  }
  
  private validEmail(email: string): boolean {
    let emailReg: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailReg.test(email);
  }

  public update = (section: string, add: boolean): void => {
    if (add) {
      this.setState({ checked: [...this.state.checked, section] });
    } else {
      this.setState({
        checked: this.state.checked.filter((elem: string) => elem !== section)
      });
    }
  }

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
              {this.props.term === this.props.watchableTerm && <th style={{ textAlign: "center" }}>Watch</th>}
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
                update={this.update}
                watch={this.props.term === this.props.watchableTerm}
              />
            ))}
          </tbody>
        </table>
        {this.props.results[0] && this.props.term === this.props.watchableTerm ?
        <Button
          id="watchButton"
          type="primary"
          size="large"
          shape="round"
          onClick={this.toggleSubmitDialog}
          disabled={this.state.checked.length === 0}
        >
          Watch
        </Button>
        : <div/>}
        <SubmitModal
          bodyStyle={{
            width: "40vw",
          }}
          maskClosable={true}
          visible={this.state.submitDialogVisible}
          title="How should we notify you?"
          onOk={this.submit}
          onCancel={this.toggleSubmitDialog}
          onChange={(e: string) => {this.setState({ email: e }); }}
          setEmailError={()=>{ this.setState({emailError: false}); }}
          emailError={this.state.emailError}
          value={this.state.email}
        />
      </div>
    );
  }
}

export default ResultsTable;
