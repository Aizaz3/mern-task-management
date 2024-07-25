// pages/Home.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticateUser } from '../actions/authActions';
import Sidebar from './Sidebar';
import TaskList from './TaskList';

const Home = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(authenticateUser(token));
    }
  }, [dispatch, token]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar userId={user ? user._id : null} />
      <div className="flex-1 p-6">
        <header className="bg-gray shadow p-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user ? user.username : 'Guest'}
          </h1>
        </header>
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
