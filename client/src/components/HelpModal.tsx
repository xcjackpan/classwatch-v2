import React, { Component } from "react";
import { Search, Clipboard, CheckSquare, Mail, Trash } from "react-feather";
import "./HelpModal.css";

class HelpModal extends Component<any, any> {
  render() {
    return (
      <div id="help-modal">
        <span><Search size={16} className="icon"/> Search for a course (e.g. ECON101, CS246E)</span>
        <span><Clipboard size={16} className="icon"/> View sections, instructors, locations, and enrollment numbers</span>
        <span><CheckSquare size={16} className="icon"/> Select sections to watch</span>
        <span><Mail size={16} className="icon"/> Receive email notifications when spots are available</span>
        <span><Trash size={16} className="icon"/> Enter your removal code (found in email) to stop notifications</span>
      </div>
    );
  }
}

export default HelpModal;
