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

    // const user = userInfo._id;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      // data: {
      //   user,
      // },
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
