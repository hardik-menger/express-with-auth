import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

//get current profile
export const getcurrentprofile = () => dispatch => {
  dispatch(setprofileloading());
  axios
    .get("/api/profile")
    .then(res => {
      console.log(res.data);
      return dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
};
//loading profile
export const setprofileloading = () => {
  return {
    type: PROFILE_LOADING
  };
};
//clear profile
export const clearcurrentprofile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
