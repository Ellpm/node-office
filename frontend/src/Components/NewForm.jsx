import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import { addVacationFetch } from "../fetches/vacationFetch";
import Box from "@material-ui/core/Box";

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: "",
      finishDate: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  addVacation = async () => {
    await addVacationFetch(
      localStorage.getItem("email"),
      this.state.startDate,
      this.state.finishDate
    );
    setTimeout(() => {
      this.props.getVacations();
    }, 1000);
  };

  render() {
    return (
      <Box direction="row">
        <TextField
          required
          label="Начало отпуска"
          type="date"
          defaultValue={moment(Date.now()).format("YYYY-MM-DD")}
          onChange={this.handleChange}
          name="startDate"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          label="Окончание отпуска"
          type="date"
          defaultValue={moment(Date.now()).format("YYYY-MM-DD")}
          onChange={this.handleChange}
          name="finishDate"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="contained" color="primary"
          onClick={() => {
            this.addVacation();
          }}
        >
          Добавить
        </Button>
      </Box>
    );
  }
}
