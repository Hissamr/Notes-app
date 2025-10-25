import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">📝 Notes App</Link>
      </div>
      <div className="navbar-menu">
        {user ? (
          <>
            <span className="user-info">
              Welcome, {user.username} ({user.role})
            </span>
            <Link to="/dashboard" className="nav-link">
              {user.role === 'PARENT' ? 'Dashboard' : 'My Notes'}
            </Link>
            {user.role === 'PARENT' && (
              <Link to="/parent" className="nav-link">Parent Dashboard</Link>
            )}
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link-signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;