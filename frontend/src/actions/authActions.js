// authActions.js
import axios from 'axios';
import { SIGNIN_SUCCESS, SIGNIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAIL, UPDATE_EMAIL_SUCCESS, UPDATE_EMAIL_FAIL, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL  } from './types';

// Sign-in action
export const signin = (username, password) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/signin', { username, password });
    const { token } = res.data;

    // Store the token in localStorage or sessionStorage
    localStorage.setItem('token', token); // or sessionStorage.setItem('token', token);

    dispatch({ type: SIGNIN_SUCCESS, payload: { token } });
    return token;
  } catch (error) {
    dispatch({ type: SIGNIN_FAIL });
    return null;
  }
};

// Logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem('token'); // or sessionStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};

// Fetch profile action to check if user is authenticated
export const authenticateUser = () => async (dispatch) => {
  const token = localStorage.getItem('token'); // or sessionStorage.getItem('token');
  console.log('Token from storage:', token); // Log the token here

  if (!token) {
    return dispatch({ type: FETCH_PROFILE_FAIL });
  }

  try {
    const res = await axios.get('http://localhost:5000/api/auth/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_PROFILE_FAIL });
  }
};// Sign Up Action
export const signup = (username, email, password) => async (dispatch) => {
  try {
    await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });
    dispatch({
      type: REGISTER_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: 'Error creating user',
    });
  }
};

export const updateEmail = (token, userId, newEmail) => async (dispatch) => {
  try {
    await axios.put('http://localhost:5000/api/auth/update-email', { userId, newEmail }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    dispatch({ type: UPDATE_EMAIL_SUCCESS });
  } catch (error) {
    dispatch({ type: UPDATE_EMAIL_FAIL, payload: error.response.data.message });
  }
};
// Update password action
export const updatePassword = (token, userId, oldPassword, newPassword) => async (dispatch) => {
  try {
    await axios.put('http://localhost:5000/api/auth/update-password', { userId, oldPassword, newPassword }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    dispatch({ type: UPDATE_PASSWORD_SUCCESS });
  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message });
  }
};