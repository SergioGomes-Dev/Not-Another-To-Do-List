import axios from "axios";
import {
  ITEM_FAIL,
  ITEM_REQUEST,
  ITEM_SUCCESS,
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
