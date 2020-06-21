import React, { Component } from 'react'
import Form from "./Form";

export default class ViewVacations extends Component {
  render() {
    return (
      <div>
        Отпуска других сотрудников:
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
