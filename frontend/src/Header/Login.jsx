import React from "react";
import { connect } from "react-redux";
import { addUser } from "../redux/action";
import { withRouter } from "react-router-dom";
import { loginFetch } from "../fetches/loginFetch";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      status: false,
      token: "",
      message: "",
    };
  }

  createData(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  userAuthorization = async () => {
    let result = await loginFetch(this.state.email, this.state.password);
    const { email, _id, firstName, lastName, role } = result.user;
    localStorage.setItem("email", email);
    // localStorage.setItem("token", token);
    localStorage.setItem("id", _id);
    localStorage.setItem("user", result.user);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("role", role);

    this.setState({
      status: result.login,
    });
  };

  render() {
    return (
      <>
        <div>
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

          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              await this.userAuthorization();
              if (this.state.status) {
                this.props.addUser(this.state.email);
                localStorage.setItem("email", this.state.email);
                this.props.history.push(`/`);
              } else {
                document.querySelector(".log").innerHTML +=
                  "<b>Неверные данные</b>";
              }
            }}
          >
            Войти
          </Button>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (email) => dispatch(addUser(email)),
});

export default withRouter(connect(null, mapDispatchToProps)(Login));
