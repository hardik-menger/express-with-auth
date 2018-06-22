import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_PROFILE
} from "../actions/types";
const initialstate = {
  profile: null,
  profiles: null,
  loading: false
};
export default (state = initialstate, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return { ...state, loading: true };
    case GET_PROFILE:
      return { ...state, loading: false, profile: action.payload };
    case CLEAR_CURRENT_PROFILE:
      return { ...state, profile: null };
    case SET_PROFILE:
      console.log(action.payload);
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};
