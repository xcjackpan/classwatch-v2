import React, { Component } from "react";
import { Search, Clipboard, CheckSquare, Mail, Trash } from "react-feather";

class HelpModal extends Component<any, any> {
  render() {
    return (
      <div>
        <Search />
        <Clipboard />
        <CheckSquare />
        <Mail />
        <Trash />
      </div>
    );
  }
}

export default HelpModal;
