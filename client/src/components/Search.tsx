import React, { Component } from "react";
import { Input, Select, Icon } from "antd";
import "./Search.css";

const InputGroup = Input.Group;
const { Option } = Select;

class Search extends Component<any, any> {
  render() {
    return (
      <InputGroup className="search" compact>
        <Select
          className="term"
          defaultValue="Zhejiang"
          dropdownClassName="term-dropdown"
        >
          <Option value="Zhejiang">Zhejiang</Option>
          <Option value="Jiangsu">Jiangsu</Option>
        </Select>
        <Input
          className="course-code"
          style={{ width: "30%" }}
          placeholder="Xihu District, Hangzhou"
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
