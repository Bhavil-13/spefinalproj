// SignupComponent.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';

const SignupComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    // Implement your signup logic here
    // For simplicity, let's assume any non-empty username and password is valid
    if (username && password) {
      // Redirect to Login after successful signup
      navigate('/login');
    } else {
      alert('Please enter a valid username and password');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Signup</h2>
      <div className="card col-md-6 offset-md-3">
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSignup}
            >
              Signup
            </button>

            {/* Add a link/button to go to the Login page */}
            <p className="mt-3">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
