import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import {
  getVacationsFetch,
  updateVacationFetch,
  deleteVacationFetch,
} from "../fetches/vacationFetch";

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: "",
      finishDate: "",
    };
    this.deleteVacation = this.deleteVacation.bind(this);
    this.updateVacation = this.updateVacation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  updateVacation = async (vacation) => {
    // if (this.state.startDate || this.state.startDate) {
    let result = await updateVacationFetch(
      localStorage.getItem("email"),
      vacation,
      this.state.startDate,
      this.state.finishDate
    );
    this.setState({
      vacations: result.vacations,
      startDate: "",
      finishDate: "",
    });
    this.props.getVacations();
    console.log(vacation._id);
  };

  deleteVacation = async (vacation) => {
    let result = await deleteVacationFetch(
      localStorage.getItem("email"),
      vacation
    );
    this.props.getVacations();
  };

  render() {
    const { vacation, index } = this.props;
    return (
      <form key={index} id={vacation._id}>
        <Grid direction="row">
          <p>{index + 1}</p>
          <TextField
            id={vacation._id}
            label="Начало отпуска"
            type="date"
            defaultValue={moment(vacation.startDate).format(
              "YYYY-MM-DD"
            )}
            onChange={this.handleChange}
            name="startDate"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id={vacation._id}
            label="Окончание отпуска"
            type="date"
            defaultValue={moment(vacation.finishDate).format(
              "YYYY-MM-DD"
            )}
            onChange={this.handleChange}
            name="finishDate"
            InputLabelProps={{
              shrink: true,
            }}
          />
          {!vacation.blocked ? (
            <ButtonGroup>
              <Button
                onClick={() => {
                  this.updateVacation(vacation);
                }}
              >
                Изменить
              </Button>
              <Button
                onClick={() => {
                  this.deleteVacation(vacation);
                }}
              >
                Удалить
              </Button>
            </ButtonGroup>
          ) : (
            <p>Даты нельзя поменять</p>
          )}
        </Grid>
      </form>
    );
  }
}
