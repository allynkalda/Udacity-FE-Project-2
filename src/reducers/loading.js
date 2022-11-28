import { GET_QUESTIONS } from "../actions/questions";

export default function loading(state = true, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return false;
    default:
      return state;
  }
}