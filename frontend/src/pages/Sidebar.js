import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';
import { FiMenu, FiX } from 'react-icons/fi';

const Sidebar = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`fixed z-30 inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-gray-800 text-white w-64`}>
        <div className="flex items-center justify-between p-5 bg-gray-900">
          <h2 className="text-lg font-bold">Dashboard</h2>
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-white focus:outline-none">
            <FiX size={24} />
          </button>
        </div>
        <ul className="mt-5 space-y-4">
          <li>
            <Link to={`/update-email?userId=${userId}`} className="block px-5 py-2 rounded hover:bg-gray-700">Update Email</Link>
          </li>
          <li>
            <Link to={`/update-password?userId=${userId}`} className="block px-5 py-2 rounded hover:bg-gray-700">Update Password</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="block w-full text-left px-5 py-2 rounded hover:bg-gray-700">Logout</button>
          </li>
        </ul>
      </div>
      {!isOpen && (
        <button onClick={toggleSidebar} className="fixed z-30 left-0 top-5 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-r">
          <FiMenu size={24} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
