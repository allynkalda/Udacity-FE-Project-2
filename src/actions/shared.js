import { getInitialUsers, getInitialQuestions } from "../utils/api";
import { receiveUsers } from "./users";
import { getQuestions } from "./questions";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialUsers().then(({ users }) => {
      dispatch(receiveUsers(users));
      dispatch(hideLoading());
    });
  };
}

export function getAllQuestions() {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialQuestions().then(({ questions }) => {
          dispatch(getQuestions(questions));
          dispatch(hideLoading());
        });
    };
}