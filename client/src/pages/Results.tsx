import React, { Component } from "react";
import { Link } from "react-router-dom";
import { HelpCircle } from "react-feather";
import Search from "../components/Search";
import ResultsTable from "../components/ResultsTable";
import "./Results.css";
import axios from "axios";
import _ from "lodash";

interface IProps {
  changeTerm: (term: string) => void;
  help: () => void;
  history?: any;
  location?: any;
  match?: any;
  search: (searchString: string) => void;
}

class Results extends Component<any, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchResults();
  }

  componentDidUpdate() {
    this.fetchResults();
  }

  shouldComponentUpdate(nextProps: IProps): boolean {
    return !_.isEqual(this.props, nextProps);
  }

  fetchResults = () => {
    const {
      term,
      courseCode
    }: { term: number; courseCode: string } = this.props.match.params;
    const { subject, courseNumber } = this.getCourse(courseCode);

    axios
      .get(`http://localhost:3001/search/${term}/${subject}/${courseNumber}`)
      .then(res => {
        this.setState({ results: res.data });
      });
  };

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
            className="search"
            terms={this.props.terms}
            changeTerm={this.props.changeTerm}
            search={this.props.search}
          />
          <HelpCircle id="help-icon" onClick={this.props.help} />
        </div>
        <ResultsTable results={this.state.results} />
      </div>
    );
  }
}

export default Results;
