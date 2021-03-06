import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { getBaseSaga } from "../redux/action";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import Fix from "./Fix";
import Change from "./Change";
import {
  updateVacationFetch,
  deleteVacationFetch,
} from "../fetches/vacationFetch";

class Form extends Component {
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



    
    if (this.state.startDate || this.state.startDate) {
if (Date())

      await updateVacationFetch(
        localStorage.getItem("email"),
        vacation,
        this.state.startDate,
        this.state.finishDate,
        vacation.blocked
      );
      this.setState({
        startDate: "",
        finishDate: "",
      });
      this.props.getBaseSaga();
    }
  };

  deleteVacation = async (vacation) => {
    await deleteVacationFetch(localStorage.getItem("email"), vacation);
    this.props.getBaseSaga();
  };

  render() {
    const { vacation, index } = this.props;
    return (
      <div>
        <Change
          readonly={this.props.readonly}
          firstName={this.props.firstName}
          lastName={this.props.lastName}
        />
        <form key={index} id={vacation._id}>
          <Box direction="row">
            <TextField
              id={vacation._id}
              disabled={this.props.disabled}
              label="Начало отпуска"
              type="date"
              defaultValue={moment(vacation.startDate).format("YYYY-MM-DD")}
              onChange={this.handleChange}
              name="startDate"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id={vacation._id}
              disabled={this.props.disabled}
              label="Окончание отпуска"
              type="date"
              defaultValue={moment(vacation.finishDate).format("YYYY-MM-DD")}
              onChange={this.handleChange}
              name="finishDate"
              InputLabelProps={{
                shrink: true,
              }}
            />
            {!vacation.blocked && !this.props.readonly ? (
              <ButtonGroup hidden={vacation.blocked}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.updateVacation(vacation);
                  }}
                >
                  Изменить
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.deleteVacation(vacation);
                  }}
                >
                  Удалить
                </Button>
              </ButtonGroup>
            ) : null}

            <Fix vacation={this.props.vacation} />
          </Box>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getBaseSaga,
};
export default connect(null, mapDispatchToProps)(Form);
