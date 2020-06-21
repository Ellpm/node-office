import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { addUser } from "../redux/action";
import { connect } from "react-redux";
import './Header.css'

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
                  <Link
                    to="/"
                    onClick={() => {
                      this.userLogout();
                      this.props.addUser(this.state.email);
                    }}
                  >
                    Logout
                  </Link>
            </div>
          ) : (
            <div className="nav">              
                  <Link to="/registration">Registration</Link>         
                  <Link to="/login">Login</Link>
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
