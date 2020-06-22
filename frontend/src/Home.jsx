import React, { Component } from "react";
import preloader from "./assets/preloader.svg";
import Button from "@material-ui/core/Button";
import Form from "./Components/Form";
import NewForm from "./Components/NewForm";
import ViewVacations from "./Components/ViewVacations";
import { connect } from "react-redux";
import { getBaseSaga } from "./redux/action";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addInput: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleButton = () => {
    this.setState({ addInput: true });
  };

  componentDidMount() {
    this.props.getBaseSaga();
  }

  render() {
    const userId = localStorage.getItem("id");
    return (
      <>
        <div className="welcome">
          Здраствуйте, {localStorage.getItem("firstName")}
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.handleButton()}
        >
          Добавить планируемый отпуск
        </Button>
        <br />
        {this.state.addInput ? (
          <NewForm />
        ) : (
          null
        )}
        <h3>Ваши отпуска:</h3>
        {this.props.isFetching ? (
          <>
            <div>
              {this.props.vacations
                .filter((vacation) => vacation.userId === userId)
                .map((vacation, index) => (
                  <Form
                    vacation={vacation}
                    index={index}
                    key={index}
                    disabled={vacation.blocked}
                  />
                ))}
            </div>
            <ViewVacations userId={userId} />
          </>
        ) : (
          <img src={preloader} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  vacations: state.vacations.vacations,
  isFetching: state.isFetching,
  email: state.email,
});

const mapDispatchToProps = {
  getBaseSaga,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
