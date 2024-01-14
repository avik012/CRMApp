import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstant";
import { loadUserApiCall, loginApiCall } from "../network";

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const data = await loginApiCall(username, password);

    dispatch({ type: LOGIN_SUCCESS, payload: data });

    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const data = await loadUserApiCall();
    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

export const logout = () => (dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_SUCCESS });

    localStorage.removeItem("token");
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: error.response.data.message });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
