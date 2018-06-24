import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorreducer from "./errorreducer";
import profilereducer from "./profilereducer";
import postreducer from "./postReducer";
export default combineReducers({
  auth: authReducer,
  error: errorreducer,
  profile: profilereducer,
  post: postreducer
});
