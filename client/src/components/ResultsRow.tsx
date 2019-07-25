import React, { Component } from "react";
import { Checkbox } from "antd";

class ResultsRow extends Component<any, any> {
  render() {
    const rowData = this.props.row;
    if (rowData.reserve && rowData.date) {
      return (
        <tr className="reserveRow">
          {this.props.watch ? 
          <td className="checkbox-container">
            <Checkbox
              className="checkbox"
              value={rowData.section}
              onChange={e => {
                this.props.update(rowData.section, e.target.checked);
              }}
            />
          </td> : null}
          <td className="reserveCell">{rowData.reserve}</td>
          <td>{rowData.instructor}</td>
          <td>
            {rowData.days ? rowData.days.toString().replace(/,/g, ", ") : null}{" "}
            {rowData.date ? rowData.date[0] : null}
          </td>
          <td>{rowData.time}</td>
          <td>{rowData.location}</td>
          <td>
            {rowData.reserveEnrolTotal} / {rowData.reserveEnrolCap}
          </td>
        </tr>
      );
    } else if (rowData.reserve) {
      return (
        <tr className="reserveRow">
          {this.props.watch ? 
          <td className="checkbox-container">
            <Checkbox
              className="checkbox"
              value={rowData.section}
              onChange={e => {
                this.props.update(rowData.section, e.target.checked);
              }}
            />
          </td> : null}
          <td colSpan={5} className="reserveCell">
            {rowData.reserve}
          </td>
          <td>
            {rowData.reserveEnrolTotal} / {rowData.reserveEnrolCap}
          </td>
        </tr>
      );
    } else if (!rowData.enrolCap) {
      return (
        <tr className="reserveRow">
          <td />
          <td />
          <td>{rowData.instructor}</td>
          <td>
            {rowData.days ? rowData.days.toString().replace(/,/g, ", ") : null}{" "}
            {rowData.date ? rowData.date[0] : null}
          </td>
          <td>{rowData.time}</td>
          <td>{rowData.location}</td>
          <td />
        </tr>
      );
    } else {
      return (
        <tr>
          {this.props.watch ? 
          <td className="checkbox-container">
            <Checkbox
              className="checkbox"
              value={rowData.section}
              onChange={e => {
                this.props.update(rowData.section, e.target.checked);
              }}
            />
          </td> : null}
          <td>{rowData.section}</td>
          <td>{rowData.instructor}</td>
          <td>
            {rowData.days ? rowData.days.toString().replace(/,/g, ", ") : null}{" "}
            {rowData.date ? rowData.date[0] : null}
          </td>
          <td>{rowData.time}</td>
          <td>{rowData.location}</td>
          <td>
            {rowData.enrolTotal} / {rowData.enrolCap}
          </td>
        </tr>
      );
    }
  }
}

export default ResultsRow;
