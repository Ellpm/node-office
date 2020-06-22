import { ADD_USER, GET_BASE, GET_BASE_SAGA } from "./action-types";

export const addUser = (payload) => {
  return {
    type: ADD_USER,
    email: payload,
  };
};

export const getBase = (payload) => {
  return {
    type: GET_BASE,
    vacations: payload,
  };
};

export const getBaseSaga = () => {
  return {
    type: GET_BASE_SAGA,
  };
};
