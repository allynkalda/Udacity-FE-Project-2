export const SET_AUTHED_USER = "SET_AUTHED_USER";

export function setAuthedUser(employee) {
  return {
    type: SET_AUTHED_USER,
    employee,
  };
}