import {
  ITEM_FAIL,
  ITEM_REQUEST,
  ITEM_SUCCESS,
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
