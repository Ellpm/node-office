import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_BASE_SAGA,
} from "../action-types";
import { getBase } from "../action";
import { getVacationsFetch } from "../../fetches/vacationFetch";

function* fetchSagaGetData(payload) {
  try {
    const vacations = yield call(getVacationsFetch);
    yield put(getBase(vacations));
  } catch (e) {
    console.log(e);
  }
}

export default function* actionWatcher() {
  yield takeLatest(GET_BASE_SAGA, fetchSagaGetData);
}