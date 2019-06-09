import React, { Component } from "react";
import Search from "../components/Search";
import "./Results.css";

class Results extends Component<any, any> {
  componentDidMount() {
    const {
      term,
      courseCode
    }: { term: number; courseCode: string } = this.props.match.params;
    console.log(term);
    console.log(courseCode);

    // make request
  }

  getCourse = (
    courseCode: string
  ): { subject: string; courseNumber: string } => {
    const subjectMatch: RegExpMatchArray | null = courseCode.match(/[A-z]+/);
    const courseNumberMatch: RegExpMatchArray | null = courseCode.match(/\d+./);
    return {
      subject: subjectMatch ? subjectMatch[0].trim() : "",
      courseNumber: courseNumberMatch ? courseNumberMatch[0].trim() : ""
    };
  };

  render() {
    return (
      <div className="results-page">
        <div className="top-bar">
          <div className="title">ClassWatch.</div>
          <Search terms={this.props.terms} changeTerm={this.props.changeTerm} />
        </div>
      </div>
    );
  }
}

export default Results;
