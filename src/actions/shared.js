import { getInitialUsers, getInitialQuestions } from "../utils/api";
import { receiveUsers } from "./users";
import { getQuestions } from "./questions";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialUsers().then(({ users }) => {
      dispatch(receiveUsers(users));
    });
  };
}

export function getAllQuestions() {
    return (dispatch) => {
        return getInitialQuestions().then(({ questions }) => {
          dispatch(getQuestions(questions));
        });
    };
}