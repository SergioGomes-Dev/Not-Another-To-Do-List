import axios from "axios";
import {
  LISTS_FAIL,
  LISTS_REQUEST,
  LISTS_SUCCESS,
  LIST_FAIL,
  LIST_REQUEST,
  LIST_SUCCESS,
  LIST_CREATE_FAIL,
  LIST_CREATE_REQUEST,
  LIST_CREATE_SUCCESS,
  LIST_DELETE_FAIL,
  LIST_DELETE_REQUEST,
  LIST_DELETE_SUCCESS,
  LIST_EDIT_FAIL,
  LIST_EDIT_REQUEST,
  LIST_EDIT_SUCCESS,
} from "../constants/listConstants";

export const listsAllAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LISTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/lists", config);

    dispatch({
      type: LISTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LISTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSingleAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/lists/${id}`, config);

    dispatch({
      type: LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCreateAction = (name, user) => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/lists", { user, name }, config);

    dispatch({
      type: LIST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/lists/${id}`, config);

    dispatch({
      type: LIST_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LIST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listEditAction = (id, name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_EDIT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/lists/${id}`, { name }, config);

    dispatch({
      type: LIST_EDIT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LIST_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
