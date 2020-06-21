import React, { Component } from "react";
import Form from "./Form";
import "./ViewVacations.css"

export default class ViewVacations extends Component {
  render() {
    return (
      <div className="container">
        <h3>Отпуска других сотрудников:</h3>
        {this.props.vacations
          .filter((vacation) => vacation.userId !== this.props.userId)
          .map((vacation, key) => (
            <Form
              readonly="true"
              vacation={vacation}
              index={key}
              key={key}
              firstName={vacation.firstName}
              lastName={vacation.lastName}
            />
          ))}
      </div>
    );
  }
}
