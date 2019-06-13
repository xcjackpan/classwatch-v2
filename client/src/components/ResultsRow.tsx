import React, { Component } from "react";

class ResultsRow extends Component<any, any> {
  render() {
    const rowData = this.props.row;
    if (rowData.reserve && rowData.date) {
      return (
        <tr className="reserveRow">
          <td className="checkbox-container">
            <label className="container">
              <input
                className="checkbox"
                type="checkbox"
                name="sections[]"
                value={rowData.section}
              />
              <span className="checkmark" />
            </label>
          </td>
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
          <td className="checkbox-container">
            <label className="container">
              <input
                className="checkbox"
                type="checkbox"
                name="sections[]"
                value={rowData.section}
              />
              <span className="checkmark" />
            </label>
          </td>
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
          <td className="checkbox-container">
            <label className="container">
              <input
                className="checkbox"
                type="checkbox"
                name="sections[]"
                value={rowData.section}
              />
              <span className="checkmark" />
            </label>
          </td>
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
