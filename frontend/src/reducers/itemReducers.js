import {
  ITEM_FAIL,
  ITEM_REQUEST,
  ITEM_SUCCESS,
  ITEM_ADD_FAIL,
  ITEM_ADD_REQUEST,
  ITEM_ADD_RESET,
  ITEM_ADD_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_RESET,
  ITEM_EDIT_FAIL,
  ITEM_EDIT_REQUEST,
  ITEM_EDIT_RESET,
  ITEM_EDIT_SUCCESS,
  ITEM_CHECK_REQUEST,
  ITEM_CHECK_SUCCESS,
  ITEM_CHECK_FAIL,
  ITEM_CHECK_RESET,
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

export const itemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_DELETE_REQUEST:
      return { loading: true };
    case ITEM_DELETE_SUCCESS:
      return { loading: false, success: action.payload };
    case ITEM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ITEM_DELETE_RESET:
      return { success: false };
    default:
      return state;
  }
};

export const itemEditReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_EDIT_REQUEST:
      return { loading: true };
    case ITEM_EDIT_SUCCESS:
      return { loading: false, success: true };
    case ITEM_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case ITEM_EDIT_RESET:
      return { success: false };
    default:
      return state;
  }
};

export const itemCheckReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_CHECK_REQUEST:
      return { loading: true };
    case ITEM_CHECK_SUCCESS:
      return { loading: false, success: true };
    case ITEM_CHECK_FAIL:
      return { loading: false, error: action.payload };
    case ITEM_CHECK_RESET:
      return { success: false };
    default:
      return state;
  }
};
