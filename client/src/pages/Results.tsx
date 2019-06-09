import React, { Component } from "react";
import { Link } from "react-router-dom";
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
          <Link className="title" to="/">
            ClassWatch.
          </Link>
          <Search
            terms={this.props.terms}
            changeTerm={this.props.changeTerm}
            search={this.props.search}
          />
        </div>
      </div>
    );
  }
}

export default Results;
