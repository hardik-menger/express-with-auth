import axios from "axios";
import {
  ADD_POST,
  GET_ERRORS,
  POST_LOADING,
  GET_POSTS,
  DELETE_POST,
  GET_POST,
  CLEAR_ERRORS
} from "./types";

export const addpost = postdata => dispatch => {
  axios
    .post("/api/posts", postdata)
    .then(res => dispatch({ type: ADD_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const getposts = () => dispatch => {
  dispatch({ type: POST_LOADING });
  axios
    .get("/api/posts")
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_POSTS, payload: {} }));
};
export const getpost = id => dispatch => {
  dispatch({ type: POST_LOADING });
  axios
    .get(`/api/posts/${id}`)
    .then(res => {
      return dispatch({ type: GET_POST, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_POST, payload: null }));
};
export const deletepost = id => dispatch => {
  dispatch(setpostloading());
  axios
    .delete(`/api/posts/delete/${id}`)
    .then(res => dispatch({ type: DELETE_POST, payload: id }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
export const addlike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getposts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
export const setpostloading = () => dispatch => {
  return { type: POST_LOADING };
};
export const addComment = (id, data) => dispatch => {
  dispatch(setpostloading());
  axios
    .post(`/api/posts/comment/${id}`, data)
    .then(res => dispatch({ type: GET_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
export const deletecomment = (id, cid) => dispatch => {
  axios
    .delete(`/api/posts/comment/delete/${id}/${cid}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const clearerrors = () => {
  return { type: CLEAR_ERRORS };
};
