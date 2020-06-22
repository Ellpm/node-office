import React, { Component } from "react";
import Form from "./Form";
import { connect } from "react-redux";
import "./ViewVacations.css";

class ViewVacations extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        {this.props.vacations
          .filter((vacation) => vacation.userId !== this.props.userId)
          .map((vacation, key) => (
            <Form
              readonly={true}
              disabled={true}
              vacation={vacation}
              key={key}
              firstName={vacation.firstName}
              lastName={vacation.lastName}
            />
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  vacations: state.vacations.vacations,
});

export default connect(mapStateToProps)(ViewVacations);
