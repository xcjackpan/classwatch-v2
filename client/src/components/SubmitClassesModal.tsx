import React, { Component } from "react";
import { Button, Modal } from "antd";
import { TextInput } from "./TextInput";

class SubmitModal extends Component<any, any> {
  render() {
    return (
      <Modal
        bodyStyle={{
          width: "40vw",
        }}
        maskClosable={true}
        visible={this.props.visible}
        title="How should we notify you?"
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}
        footer={[
          <Button key="back" onClick={this.props.onCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={this.props.onOk}>
            Submit
          </Button>,
        ]}
      >
        <span>
          <TextInput           
              style={{
                width: "20vw",
                minWidth: "180px"
              }}
              placeholder="Enter your email"
              prefix="mail"
              size="default"
              onPressEnter={this.props.onOk}
              onChange={(e: any) => {
                if (this.props.emailError) {
                  this.props.setEmailError();
                }
                this.props.onChange(e.target.value.toLowerCase());
              }}
          />
          <p style={{display: this.props.emailError ? "inline" : "none"}}
             className="error-message">Invalid email format!</p>
        </span>
      </Modal>
    );
  }
}

export default SubmitModal;
