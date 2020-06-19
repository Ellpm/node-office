import React from "react";
import { connect } from "react-redux";
import { addUser } from "../redux/action";
import { withRouter } from "react-router-dom";
import { loginFetch } from "../fetches/loginFetch";

class Login extends React.Component {
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

  userAuthorization = async () => {
    let result = await loginFetch(this.state.email, this.state.password);
    this.setState({
      status: result.login,
    });
  };

  render() {
    return (
      <>
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
        </div>

        <button
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
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (email) => dispatch(addUser(email)),
});

export default withRouter(connect(null, mapDispatchToProps)(Login));
