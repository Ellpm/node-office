import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { addUser } from "../redux/action";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      status: false,
    };
  }

  userLogout = () => {
    localStorage.removeItem("email");
    this.setState({
      status: false,
    });
  };
  render() {
    const storage = localStorage.getItem("email");

    return (
      <nav>
        <div>
          {storage ? (
            <div>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={() => {
                      this.userLogout();
                      this.props.addUser(this.state.email);
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <ul>
                <li>
                  <Link to="/registration">Registration</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (email) => dispatch(addUser(email)),
});

export default withRouter(connect(null, mapDispatchToProps)(Header));
