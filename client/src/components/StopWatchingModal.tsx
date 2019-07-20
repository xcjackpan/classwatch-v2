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
        title="Enter your removal code to stop watching a course"
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
              placeholder="What was your removal code?"
              size="default"
              onPressEnter={this.props.onOk}
              onChange={(e: any) => {
                this.props.onChange(e.target.value.toLowerCase());
              }}
          />
        </span>
      </Modal>
    );
  }
}

export default StopWatchingModal;
