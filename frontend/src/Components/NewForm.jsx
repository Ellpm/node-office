import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import { addVacationFetch } from "../fetches/vacationFetch";

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
    let result = await addVacationFetch(
      localStorage.getItem("email"),
      this.state.startDate,
      this.state.finishDate
    );
    this.props.getVacations();
  };

  render() {
    return (
      <Grid direction="row">
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
          onClick={() => {
            this.addVacation();
          }}
        >
          Добавить
        </Button>
      </Grid>
    );
  }
}
