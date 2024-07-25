// UpdatePassword.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../actions/authActions';
import { useLocation } from 'react-router-dom';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const [success, setSuccess] = useState('');

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setUserId(queryParams.get('userId'));
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (userId) {
      dispatch(updatePassword(token, userId, oldPassword, newPassword)).catch(err => setError(err.message));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border border-gray-300 rounded">
      <h2 className="text-2xl font-bold mb-5">Update Password</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old Password"
          className="border border-gray-300 p-2 w-full mb-4 rounded"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="border border-gray-300 p-2 w-full mb-4 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
