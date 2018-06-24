import axios from "axios";
import {
  ADD_POST,
  GET_ERRORS,
  POST_LOADING,
  GET_POSTS,
  DELETE_POST
} from "./types";

export const addpost = postdata => dispatch => {
  dispatch(setpostloading());
  axios
    .post("/api/posts", postdata)
    .then(res => dispatch({ type: ADD_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const getposts = () => dispatch => {
  dispatch(setpostloading());
  axios
    .get("/api/posts")
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_POSTS, payload: {} }));
};
export const deletepost = id => dispatch => {
  dispatch(setpostloading());
  axios
    .delete(`/api/posts/delete/${id}`)
    .then(res => dispatch({ type: DELETE_POST, payload: id }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
export const addlike = id => dispatch => {
  dispatch(setpostloading());
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getposts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
export const setpostloading = () => dispatch => {
  return { type: POST_LOADING };
};
