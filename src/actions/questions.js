import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { createUpdatedQuestions } from "../utils/_DATA";

export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";
export const GET_QUESTIONS = "GET_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function addQuestionAnswer(answer) {
  return {
    type: ADD_QUESTION_ANSWER,
    answer,
  };
}

export function sendSavedQuestion(question) {
  return (dispatch) => {
    return saveQuestion(question).then((res) => {
      dispatch(addQuestion(res));
    });
};
}

export function sendSavedQuestionAnswer(answer) {
  return (dispatch) => {
    const updatedQuestions = createUpdatedQuestions(answer)
    dispatch(addQuestionAnswer(updatedQuestions))
    return saveQuestionAnswer(answer).then((res) => {
      dispatch(addQuestionAnswer(res));
    });
};
}