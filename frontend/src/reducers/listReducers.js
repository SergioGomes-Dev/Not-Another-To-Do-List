import {
  LISTS_REQUEST,
  LISTS_SUCCESS,
  LISTS_FAIL,
  LIST_FAIL,
  LIST_REQUEST,
  LIST_SUCCESS,
  LIST_CREATE_FAIL,
  LIST_CREATE_REQUEST,
  LIST_CREATE_SUCCESS,
  LIST_DELETE_FAIL,
  LIST_DELETE_REQUEST,
  LIST_DELETE_SUCCESS,
  LIST_DELETE_RESET,
  LIST_EDIT_FAIL,
  LIST_EDIT_REQUEST,
  LIST_EDIT_SUCCESS,
  LIST_EDIT_RESET,
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

export const listSingleReducer = (state = { list: [] }, action) => {
  switch (action.type) {
    case LIST_REQUEST:
      return { loading: true, list: [] };
    case LIST_SUCCESS:
      return { loading: false, list: action.payload };
    case LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LIST_CREATE_REQUEST:
      return { loading: true };
    case LIST_CREATE_SUCCESS:
      return { loading: false, success: action.payload };
    case LIST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case LIST_DELETE_REQUEST:
      return { loading: true };
    case LIST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case LIST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case LIST_DELETE_RESET:
      return { success: false };
    default:
      return state;
  }
};

export const listEditReducer = (state = {}, action) => {
  switch (action.type) {
    case LIST_EDIT_REQUEST:
      return { loading: true };
    case LIST_EDIT_SUCCESS:
      return { loading: false, success: true };
    case LIST_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case LIST_EDIT_RESET:
      return { success: false };
    default:
      return state;
  }
};
