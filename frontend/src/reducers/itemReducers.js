import {
  ITEM_FAIL,
  ITEM_REQUEST,
  ITEM_SUCCESS,
  ITEM_ADD_FAIL,
  ITEM_ADD_REQUEST,
  ITEM_ADD_RESET,
  ITEM_ADD_SUCCESS,
} from "../constants/itemConstants";

export const itemSingleReducer = (state = { item: [] }, action) => {
  switch (action.type) {
    case ITEM_REQUEST:
      return { loading: true, item: [] };
    case ITEM_SUCCESS:
      return { loading: false, item: action.payload };
    case ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_ADD_REQUEST:
      return { loading: true };
    case ITEM_ADD_SUCCESS:
      return { loading: false, success: action.payload };
    case ITEM_ADD_FAIL:
      return { loading: false, error: action.payload };
    case ITEM_ADD_RESET:
      return { success: false };
    default:
      return state;
  }
};
