import React, { Component } from "react";
import { getVacationsFetch } from "./fetches/vacationFetch";
import preloader from "./assets/preloader.svg";
import Button from "@material-ui/core/Button";
import Form from "./Components/Form";
import NewForm from "./Components/NewForm";
import ViewVacations from "./Components/ViewVacations";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vacations: [],
      isFetching: false,
      addInput: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.getVacations = this.getVacations.bind(this);
  }
  toggleFetch = () => {
    this.setState({
      isFetching: !this.state.isFetching,
    });
  };
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getVacations = async () => {
    this.setState({
      isFetching: false,
    });
    let result = await getVacationsFetch(localStorage.getItem("email"));
    this.setState({
      vacations: result.vacations,
      isFetching: true,
    });
  };
  handleButton = () => {
    this.setState({ addInput: true });
  };

  componentDidMount() {
    setTimeout(() => {this.getVacations()}, 1000)
    
  }

  render() {


    
    const userId = localStorage.getItem("id");
    return (
      <>
        <div>Здраствуйте, {localStorage.getItem("firstName")}</div>
        <Button onClick={() => this.handleButton()}>
          Добавить планируемый отпуск
        </Button>
        <br />
        {this.state.addInput ? (
          <NewForm getVacations={this.getVacations} />
        ) : (
          <br />
        )}
        <p>Ваши отпуска:</p>
        {this.state.isFetching ? (
          this.state.vacations
            .filter((vacation) => vacation.userId === userId)
            .map((vacation, index) => (
              <Form
                vacation={vacation}
                index={index}
                key={index}
                getVacations={this.getVacations}
              />
            ))
        ) : (
          <img src={preloader} />
        )}
        <ViewVacations userId={userId} vacations={this.state.vacations} />
      </>
    );
  }
}
