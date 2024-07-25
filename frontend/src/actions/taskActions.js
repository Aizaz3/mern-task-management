// actions/taskActions.js
import axios from 'axios';
import { CREATE_TASK_SUCCESS, CREATE_TASK_FAIL, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAIL, UPDATE_TASK_SUCCESS, UPDATE_TASK_FAIL, DELETE_TASK_SUCCESS, DELETE_TASK_FAIL } from '../actions/types';

// Action Creators
export const createTask = (taskData) => async (dispatch) => {
  console.log('Dispatching createTask with data:', taskData);
  try {
    const res = await axios.post('http://localhost:5000/api/tasks', taskData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Task creation response:', res.data);
    dispatch({ type: CREATE_TASK_SUCCESS, payload: res.data });
  } catch (error) {
    console.error('Error creating task:', error);
    dispatch({ type: CREATE_TASK_FAIL, payload: error.response.data });
  }
};

export const fetchTasks = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:5000/api/tasks');
    dispatch({ type: FETCH_TASKS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_TASKS_FAIL, payload: error.message });
  }
};

export const updateTask = (id, task) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, task, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    dispatch({ type: UPDATE_TASK_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: UPDATE_TASK_FAIL, payload: error.message });
  }
};

// Delete task
export const deleteTask = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    dispatch({ type: DELETE_TASK_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_TASK_FAIL, payload: error.message });
  }
};