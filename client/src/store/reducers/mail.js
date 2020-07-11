import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  mailSent: false,
  error: false,
  errorMessageArr: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.MAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessageArr: action.payload.errorMessageArr,
      };
    case actionTypes.MAIL_SUCCESS:
      return {
        ...initialState,
        loading: false,
        mailSent: true,
      };
    default:
      return state;
  }
};

export default reducer;
