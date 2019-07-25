import React, { Component } from "react";
import { Button, Modal } from "antd";
import { TextInput } from "./TextInput";

class StopWatchingModal extends Component<any, any> {
  render() {
    return (
      <Modal
        bodyStyle={{
          width: "40vw",
        }}
        maskClosable={true}
        visible={this.props.visible}
        title="What was the removal code for your course?"
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}
        footer={[
          <Button key="back" onClick={this.props.onCancel} shape="round">
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={this.props.onOk} shape="round">
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
              placeholder="Check your email"
              size="default"
              onPressEnter={this.props.onOk}
              onChange={(e: any) => {
                this.props.onChange(e.target.value);
              }}
          />
        </span>
      </Modal>
    );
  }
}

export default StopWatchingModal;
