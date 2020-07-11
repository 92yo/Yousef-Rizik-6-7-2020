import * as actionTypes from "./actionTypes";

export const mailInit = (mailObj) => {
  const { mail } = mailObj;

  return (dispatch) => {
    // dispatch({ type: actionTypes.LOADING });
    return fetch("/api/mail/", {
      method: "POST",
      body: JSON.stringify(mail),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          return dispatch(mailError(data.messages));
        } else {
          return dispatch(authSuccess());
        }
      })
      .catch((err) => {
        return dispatch(mailError([err.message]));
      });
  };
};
export const authSuccess = () => {
  return {
    type: actionTypes.MAIL_SUCCESS,
  };
};
export const mailError = (errorMessageArr) => {
  return {
    type: actionTypes.MAIL_ERROR,
    payload: {
      errorMessageArr,
    },
  };
};
