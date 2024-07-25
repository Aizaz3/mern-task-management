// pages/UpdateEmail.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmail } from '../actions/authActions';
import { useLocation } from 'react-router-dom';

const UpdateEmail = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [newEmail, setNewEmail] = useState('');
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
      dispatch(updateEmail(token, userId, newEmail)).catch((err) =>
        setError(err.message)
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border border-gray-300 rounded">
      <h2 className="text-2xl font-bold mb-5">Update Email</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="New Email"
          className="border border-gray-300 p-2 w-full mb-4 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Update Email
        </button>
      </form>
    </div>
  );
};

export default UpdateEmail;
