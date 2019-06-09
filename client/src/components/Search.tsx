import React, { Component } from "react";
import { Input, Select, Icon } from "antd";

const InputGroup = Input.Group;
const { Option } = Select;

class Search extends Component<any, any> {
  render() {
    let defaultValue = this.props.terms[2] || "";
    return (
      <InputGroup compact>
        <Select key={this.props.terms} defaultValue={defaultValue}>
          {this.props.terms.map((term: string) => {
            return (
              <Option key={term} value={term}>
                {term}
              </Option>
            );
          })}
        </Select>
        <Input
          style={{ width: "50%" }}
          defaultValue="Xihu District, Hangzhou"
          suffix={
            <Icon
              type="search"
              style={{ color: "rgba(0,0,0,.45)" }}
              onClick={() => console.log("search")}
            />
          }
          onPressEnter={() => console.log("search")}
        />
      </InputGroup>
    );
  }
}

export default Search;
