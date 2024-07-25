// authReducer.js
import { SIGNIN_SUCCESS, SIGNIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAIL, UPDATE_EMAIL_SUCCESS,  UPDATE_EMAIL_FAIL, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        error: null,
      };
    case SIGNIN_FAIL:
      case FETCH_PROFILE_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload
        };
    case FETCH_PROFILE_FAIL:
    case REGISTER_FAIL:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: action.payload || null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        error: null,
      };
      case UPDATE_EMAIL_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
          return {
            ...state,
            error: null,
          };
        case UPDATE_EMAIL_FAIL:
        case UPDATE_PASSWORD_FAIL:
          return {
            ...state,
            error: action.payload,
          };    
    default:
      return state;
  }
};

export default authReducer;
