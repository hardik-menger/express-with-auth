import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthtoken from "../utils/setauthtoken";
import jwt_decode from "jwt-decode";

//register user
export const registeruser = (userdata, history) => dispatch => {
  axios
    .post("/api/users/register", userdata)
    .then(res => {
      history.push("/login");
    })
    .catch(err => {
      console.log(err.response.data);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const loginuser = (userdata, history) => dispatch => {
  axios
    .post("/api/users/login", userdata)
    .then(res => {
      //save token localstorage
      const { token } = res.data;
      //set to locastorage
      localStorage.setItem("jwttoken", token);
      //set token to authheader
      setAuthtoken(token);
      //decode bearer thing
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwttoken");
  setAuthtoken(false);
  dispatch(setCurrentUser({}));
};
