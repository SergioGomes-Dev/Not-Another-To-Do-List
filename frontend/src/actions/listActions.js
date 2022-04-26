import axios from "axios";
import {
  LISTS_FAIL,
  LISTS_REQUEST,
  LISTS_SUCCESS,
} from "../constants/listConstants";

export const listsAllAction = () => async (dispatch) => {
  try {
    dispatch({ type: LISTS_REQUEST });

    const { data } = await axios.get("/api/lists");

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
