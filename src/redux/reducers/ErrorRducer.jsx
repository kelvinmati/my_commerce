import * as types from "../types";
const initialState = {
  msg: null,
  typeId: null,
};
export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ERRORS:
      return {
        ...state,
        msg: action.payload.msg,
        typeId: action.payload.typeId,
      };
    case types.CLEAR_ERRORS:
      return {
        ...state,
        msg: null,
        typeId: null,
      };
    default:
      return state;
  }
};
