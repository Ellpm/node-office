import React, { Component } from "react";

export default class Change extends Component {
  render() {
    return (
      <div>
        {this.props.readonly ? (
          <p>
            Отпуск сотрудника {this.props.firstName} {this.props.lastName}
          </p>
        ) : (
          null
        )}
      </div>
    );
  }
}
