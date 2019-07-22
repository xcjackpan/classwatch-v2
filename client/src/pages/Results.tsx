import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import { HelpCircle } from "react-feather";
import Search from "../components/Search";
import ResultsTable from "../components/ResultsTable";
import tree from "../assets/tree.png";
import "./Results.css";
import { Button } from "antd";
import { IResultsProps, IParsedResults } from "../types";

class Results extends Component<any, any> {
  constructor(props: IResultsProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchResults(undefined);
  }

  componentWillReceiveProps(nextProps: IResultsProps) {
    if (!_.isEqual(this.props, nextProps)) {
      this.fetchResults(nextProps);
    }
  }

  fetchResults = (props: IResultsProps | undefined) => {
    const {
      term,
      courseCode
    }: { term: number; courseCode: string } = props ? props.match.params : this.props.match.params;
    const { subject, courseNumber } = this.getCourse(courseCode);
    axios
      .get(`http://localhost:3001/search/${term}/${subject}/${courseNumber}`)
      .then(res => {
        this.setState({
          results: res.data,
          course: `${subject.toUpperCase()}${courseNumber}`
        });
      })
      .catch((err) => {
        this.setState({
          results: null,
          course: "",
        });
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

  parse_results = (results: any[]): IParsedResults[] => {
    let newResults: IParsedResults[] = [];
    if (!results) {
      return newResults;
    }
    for (let i: number = 0; i < results.length; i++) {
      if (!results[i].reserve && results[i + 1] && results[i + 1].reserve) {
        let reserve_enrol_total: number = 0;
        let reserve_enrol_cap: number = 0;
        let temp_index: number = i + 1;
        while (results[temp_index] && results[temp_index].reserve) {
          reserve_enrol_cap += results[temp_index].reserve_enrol_cap;
          reserve_enrol_total += results[temp_index].reserve_enrol_total;
          temp_index++;
        }
        newResults.push(results[i]);
        if (results[i].enrol_cap - reserve_enrol_cap > 0) {
          newResults.push({
            section: `${results[i].section} RES0`,
            reserve: "Not reserved",
            reserve_enrol_cap: results[i].enrol_cap - reserve_enrol_cap,
            reserve_enrol_total: results[i].enrol_total - reserve_enrol_total,
            instructor: results[i].instructor,
            time: results[i].time,
            days: results[i].days,
            date: results[i].date
          });
        }
      } else {
        newResults.push(results[i]);
      }
    }
    return newResults;
  };

  render() {
    this.parse_results(this.state.results);
    return (
      <div className="results-page">
        <div className="top-bar">
          <Link className="tree-wrapper" to="/">
            <img className="tree-icon" src={tree} alt={"Tree"}/>
          </Link>
          <Search
            className="search"
            terms={this.props.terms}
            changeTerm={this.props.changeTerm}
            search={this.props.search}
          />
          <Button type="primary" id="stop-watching-button" shape="round"
                  onClick={this.props.stopWatching}>Stop watching a course</Button>
          <HelpCircle id="help-icon" onClick={this.props.help} />
        </div>
        <ResultsTable
          results={this.parse_results(this.state.results)}
          term={this.props.match.params.term}
        />
      </div>
    );
  }
}

export default Results;
