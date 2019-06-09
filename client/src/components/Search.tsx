import React, { Component } from "react";
import { Input, Select, Icon } from "antd";

const InputGroup = Input.Group;
const { Option } = Select;

class Search extends Component<any, any> {
  render() {
    return (
      <InputGroup compact>
        <Select defaultValue="Zhejiang">
          <Option value="Zhejiang">Zhejiang</Option>
          <Option value="Jiangsu">Jiangsu</Option>
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
