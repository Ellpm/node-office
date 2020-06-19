import React, { Component } from "react";
import {registrationFetch} from "../fetches/registrationFetch";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      status: false,
    };
  }

  createData(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  createUser = async () => {
    let result = await registrationFetch(this.state.email, this.state.password);
console.log(await result);
    this.setState({
      status: result.registration,
    });
  };

  render() {
    return (
      <div>
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => this.createData(e)}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => this.createData(e)}
        />
        <button
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
        </button>
      </div>
    );
  }
}
