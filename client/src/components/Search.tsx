import React, { Component } from "react";
import { Input, Select } from "antd";
import { TextInput } from "./TextInput";
import "./Search.css";
import { ISearchProps } from "../types";
import { parseTerm } from "../utils";

const InputGroup = Input.Group;
const { Option } = Select;

class Search extends Component<any, any> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      searchString: ""
    };
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
                {parseTerm(term)}
              </Option>
            );
          })}
        </Select>
        <TextInput           
            style={{
              width: this.props.home ? "30vw" : "20vw",
              minWidth: this.props.home ? "200px" : "180px"
            }}
            placeholder="Enter a course code"
            suffix="search"
            size={this.props.home ? "large" : "default"}
            onPressEnter={() => this.props.search(this.state.searchString)}
            onChange={(e: any) => {
              this.setState({ searchString: e.target.value.toLowerCase() });
            }}
        />
      </InputGroup>
    );
  }
}

export default Search;
