import React, { Component } from "react";
import { Button } from "antd";
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
      axios.post("http://localhost:3001/watch/", {
        course: "course",
        sections: this.state.checked,
        email: this.state.email,
      }).then(() => {
        this.toggleSubmitDialog();
      });
    } else {
      this.setState({emailError: true});
    }
  }

  private toggleSubmitDialog = () => {
    this.setState({submitDialogVisible: !this.state.submitDialogVisible});
  }
  
  private validEmail(email: string): boolean {
    let emailReg: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailReg.test(email);
  }

  public update = (section: string, add: boolean): void => {
    console.log("update")
    console.log(section)
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
                update={this.update}
              />
            ))}
          </tbody>
        </table>
        <Button
          id="watch"
          type="primary"
          size="large"
          shape="round"
          onClick={this.toggleSubmitDialog}
        >
          Submit
        </Button>
        <SubmitModal
          bodyStyle={{
            width: "40vw",
          }}
          maskClosable={true}
          visible={this.state.submitDialogVisible}
          title="How should we notify you?"
<<<<<<< HEAD
          onOk={()=>{this.submit()}}
          onCancel={this.toggleSubmitDialog.bind(this)}
          onChange={(e: string) => {this.setState({ email: e }); }}
          setEmailError={()=>{ this.setState({emailError: false}); }}
          emailError={this.state.emailError}
         />
=======
          onOk={this.submit}
          onCancel={this.toggleSubmitDialog}
          footer={[
            <Button key="back" onClick={this.toggleSubmitDialog}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={this.submit}>
              Submit
            </Button>,
          ]}
        >
        <span>
          <TextInput           
              style={{
                width: this.props.home ? "30vw" : "20vw",
                minWidth: this.props.home ? "200px" : "180px"
              }}
              placeholder="Enter your email"
              prefix="mail"
              size="default"
              onPressEnter={() => {
                this.props.search(this.state.searchString)}
              }
              onChange={(e: any) => {
                if (this.state.emailError) {
                  this.setState({emailError: false});
                }
                this.setState({ email: e.target.value.toLowerCase() });
              }}
          />
          <p style={{display: this.state.emailError ? "inline" : "none"}}
             className="error-message">Invalid email format!</p>
        </span>
        </Modal>
>>>>>>> ca8325fc868a2f2842d5a17566102bca8084889e
      </div>
    );
  }
}

export default ResultsTable;
