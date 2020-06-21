import React, { Component } from "react";
import { registrationFetch } from "../fetches/registrationFetch";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "employee",
      status: false,
    };
  }

  createData(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  createUser = async () => {
    const { firstName, lastName, email, password, role } = this.state;
    let result = await registrationFetch(
      firstName,
      lastName,
      email,
      password,
      role
    );
    this.setState({
      status: result.registration,
    });
  };

  render() {
    return (
      <form>
        <TextField
          required
          type="text"
          name="firstName"
          placeholder="Имя"
          onChange={(e) => this.createData(e)}
        />
        <TextField
          required
          type="text"
          name="lastName"
          placeholder="Фамилия"
          onChange={(e) => this.createData(e)}
        />
        <TextField
          required
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => this.createData(e)}
        />
        <TextField
          required
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => this.createData(e)}
        />
        <FormControlLabel
          name="role"
          value="admin"
          control={<Checkbox color="primary" />}
          label="Admin"
          labelPlacement="end"
          onChange={(e) => this.createData(e)}
        />
        <Button
          variant="contained"
          color="primary"
          className=""
          onClick={async () => {
            await this.createUser();
            if (this.state.status) {
              this.props.history.push(`/login`);
            } else {
              console.log("Пользователь с таким email уже существует");
            }
          }}
        >
          Регистрация
        </Button>
      </form>
    );
  }
}
