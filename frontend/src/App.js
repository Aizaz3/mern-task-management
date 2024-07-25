import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import UpdateEmail from './pages/UpdateEmail';
import UpdatePassword from './pages/UpdatePassword';
import { authenticateUser } from './actions/authActions'; // Ensure profile fetching is included

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log('token');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(authenticateUser(token));
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/login" element={!auth.isAuthenticated ? <SignIn /> : <Navigate to="/home" />} />
          <Route path="/signup" element={!auth.isAuthenticated ? <SignUp /> : <Navigate to="/home" />} />
          <Route path="/home" element={auth.isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/update-email" element={auth.isAuthenticated ? <UpdateEmail /> : <Navigate to="/login" />} />
          <Route path="/update-password" element={auth.isAuthenticated ? <UpdatePassword /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
