import { ADD_USER, GET_BASE, IS_FETCHING } from "./action-types";

const initialState = {
  email: "",
  vacations: [],
  isFetching: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        email: action.email,
      };

    case GET_BASE:
      return {
        ...state,
        vacations: action.vacations,
        isFetching: true,
      };

    case IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    default:
      return state;
  }
};
