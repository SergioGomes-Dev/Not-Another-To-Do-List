import {
  LISTS_REQUEST,
  LISTS_SUCCESS,
  LISTS_FAIL,
} from "../constants/listConstants";

export const listsAllReducer = (state = { lists: [] }, action) => {
  switch (action.type) {
    case LISTS_REQUEST:
      return { loading: true, lists: [] };
    case LISTS_SUCCESS:
      return { loading: false, lists: action.payload };
    case LISTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
