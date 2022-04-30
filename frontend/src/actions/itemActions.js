import axios from "axios";
import {
  ITEM_ADD_FAIL,
  ITEM_ADD_REQUEST,
  ITEM_ADD_SUCCESS,
  ITEM_FAIL,
  ITEM_REQUEST,
  ITEM_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_EDIT_FAIL,
  ITEM_EDIT_REQUEST,
  ITEM_EDIT_SUCCESS,
  ITEM_CHECK_FAIL,
  ITEM_CHECK_SUCCESS,
  ITEM_CHECK_REQUEST,
} from "../constants/itemConstants";

export const itemSingleAction = (id, itemid) => async (dispatch, getState) => {
  try {
    dispatch({ type: ITEM_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/lists/${id}/${itemid}`, config);

    dispatch({
      type: ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const itemCreateAction = (id, title) => async (dispatch, getState) => {
  try {
    dispatch({ type: ITEM_ADD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/lists/${id}/item`,
      { title },
      config
    );

    dispatch({
      type: ITEM_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const itemDeleteAction = (id, itemid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/lists/${id}/${itemid}`, config);

    dispatch({
      type: ITEM_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const itemEditAction =
  (id, itemid, title, notes, priority) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ITEM_EDIT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/lists/${id}/${itemid}`,
        { title, notes, priority },
        config
      );

      dispatch({
        type: ITEM_EDIT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ITEM_EDIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const itemCheckAction = (id, itemid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_CHECK_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/lists/${id}/${itemid}/check`,
      {},
      config
    );

    dispatch({
      type: ITEM_CHECK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_CHECK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
