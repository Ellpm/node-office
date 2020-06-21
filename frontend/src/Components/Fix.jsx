import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { updateVacationFetch } from "../fetches/vacationFetch";

export default class Fix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: true
    };
  }

  fixVacation = async (vacation) => {
    let result = await updateVacationFetch(
      localStorage.getItem("email"),
      vacation,
      vacation.startDate,
      vacation.finishDate,
      true
      );
      this.setState({render:false})
  };

  render() {
    const role = localStorage.getItem("role");
    const { vacation } = this.props;

    if (role == "admin" && vacation.blocked === false && this.state.render === true) {
      return (
        <Button
          onClick={() => {
            this.fixVacation(vacation);
          }}
        >
          Зафиксировать
        </Button>
      );
    } else return null;
  }
}
