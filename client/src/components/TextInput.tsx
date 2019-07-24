import React from "react";
import { Input, Icon } from "antd";

type sizeTypes = "small" | "large" | "default" | undefined;

interface ITextInputProps {
  className?: string;
  style?: any;
  placeholder?: string;
  size?: sizeTypes;
  prefix?: string;
  suffix?: string;
  onPressEnter?: any;
  onChange?: any;
  value?: string;
}

export function TextInput (props: ITextInputProps): JSX.Element {
  return (
    <Input
      className={`submission-input ${props.className}`}
      style={props.style}
      placeholder={props.placeholder}
      size={props.size}
      prefix={
        props.prefix ?
        <Icon
          type={ props.prefix }
          style={{ color: "rgba(0,0,0,.45)" }}
        /> :
        null
      }
      suffix={
        props.suffix ?
        <Icon
          type={ props.suffix }
          style={{ color: "rgba(0,0,0,.45)" }}
        /> :
        null
      }
      onPressEnter={() => {
        props.onPressEnter();
      }}
      onChange={(e) => {
        props.onChange(e);
      }}
    />
  );
}