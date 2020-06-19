import React from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import Header from "./Header/Header";
import Registration from "./Header/Registration";
import "./App.css";
import { connect } from "react-redux";
import Login from "./Header/Login"
import Home from "./Home"

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const storage = localStorage.getItem("email");
    return (
      <>
        <div className="App">
          <Header />
        </div>
        <div>
          <Switch>
            <Route
              exact
              path="/registration"
              render={(props) => <Registration {...props} />}
            />
            <Route path="/login" render={(props) => <Login {...props} />} />
            {storage ? (
              <>
                <Route exact path="/">
                  <Home />
                </Route>                
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Switch>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.email,
});
const mapDispatchToProps = {
  
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

