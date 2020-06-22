import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { updateVacationFetch } from "../fetches/vacationFetch";
import { connect } from "react-redux";
import { getBaseSaga } from "../redux/action";

class Fix extends Component {

  fixVacation = async (vacation) => {
    await updateVacationFetch(
      localStorage.getItem("email"),
      vacation,
      vacation.startDate,
      vacation.finishDate,
      true
    );
        this.props.getBaseSaga();
  };

  render() {
    const role = localStorage.getItem("role");
    const { vacation } = this.props;

    if (
      role === "admin" &&
      vacation.blocked === false 
    ) {
      return (
        <Button
          variant="contained"
          color="primary"
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


const mapDispatchToProps = {
  getBaseSaga,
};
export default connect(null, mapDispatchToProps)(Fix);
