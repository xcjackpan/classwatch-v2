import React, { Component } from "react";
import { Input, Select, Icon } from "antd";
import "./Search.css";

const InputGroup = Input.Group;
const { Option } = Select;

interface IProps {
  terms: [string];
  changeTerm(term: string): void;
  search(searchString: string): void;
}

class Search extends Component<any, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      searchString: ""
    };
  }

  parseTerm(term: string): string {
    let season: string = "";
    let year: string;
    switch (term[3]) {
      case "1":
        season = "Winter";
        break;
      case "5":
        season = "Spring";
        break;
      case "9":
        season = "Fall";
        break;
    }
    year = term.substr(1, 2);
    return `${season} 20${year}`;
  }

  render() {
    let defaultValue: string = this.props.terms[2] || "";
    return (
      <InputGroup className="search" compact>
        <Select
          className="term"
          dropdownClassName="term-dropdown"
          size={this.props.home ? "large" : "default"}
          key={this.props.terms}
          defaultValue={defaultValue}
          onChange={(e: string) => {
            this.props.changeTerm(e);
          }}
        >
          {this.props.terms.map((term: string) => {
            return (
              <Option key={term} value={term}>
                {this.parseTerm(term)}
              </Option>
            );
          })}
        </Select>
        <Input
          className="course-code"
          style={{
            width: this.props.home ? "30vw" : "20vw",
            minWidth: this.props.home ? "200px" : "180px"
          }}
          placeholder="Enter a course code"
          size={this.props.home ? "large" : "default"}
          suffix={
            <Icon
              type="search"
              style={{ color: "rgba(0,0,0,.45)" }}
              onClick={() => this.props.search(this.state.searchString)}
            />
          }
          onPressEnter={() => this.props.search(this.state.searchString)}
          onChange={e => {
            this.setState({ searchString: e.target.value.toUpperCase() });
          }}
        />
      </InputGroup>
    );
  }
}

export default Search;
