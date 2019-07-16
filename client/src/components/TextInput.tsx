import React from "react";
import { Input, Icon } from "antd";

type sizeTypes = "small" | "large" | "default" | undefined;

interface ITextInputProps {
  style?: any;
  placeholder?: string;
  size?: sizeTypes;
  prefix?: string;
  suffix?: string;
  onPressEnter?: any;
  onChange?: any;
}

export function TextInput (props: ITextInputProps): JSX.Element {
  if (props.prefix && props.suffix) {
    return (
      <Input
        className="submission-input"
        style={props.style}
        placeholder={props.placeholder}
        size={props.size}
        prefix={
          <Icon
            type={ props.prefix }
            style={{ color: "rgba(0,0,0,.45)" }}
          />
        }
        suffix={
          <Icon
            type={ props.suffix }
            style={{ color: "rgba(0,0,0,.45)" }}
          />
        }
        onPressEnter={() => {
          props.onPressEnter();
        }}
        onChange={(e) => {
          props.onChange(e);
        }}
      />
    );
  } else if (props.prefix) {
    return (
      <Input
        className="submission-input"
        style={props.style}
        placeholder={props.placeholder}
        size={props.size}
        prefix={
          <Icon
            type={ props.prefix }
            style={{ color: "rgba(0,0,0,.45)" }}
          />
        }
        onPressEnter={() => {
          props.onPressEnter();
        }}
        onChange={(e) => {
          props.onChange(e);
        }}
      />
    );
  } else if (props.suffix) {
    return (
      <Input
        className="submission-input"
        style={props.style}
        placeholder={props.placeholder}
        size={props.size}
        suffix={
          <Icon
            type={ props.suffix }
            style={{ color: "rgba(0,0,0,.45)" }}
          />
        }
        onPressEnter={() => {
          props.onPressEnter();
        }}
        onChange={(e) => {
          props.onChange(e);
        }}
      />
    );
  } else {
    return (
      <Input
        className="submission-input"
        style={props.style}
        placeholder={props.placeholder}
        size={props.size}
        onPressEnter={() => {
          props.onPressEnter();
        }}
        onChange={(e) => {
          props.onChange(e);
        }}
      />
    );
  }
}