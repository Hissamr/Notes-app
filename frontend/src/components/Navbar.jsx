import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">📝 Notes App</Link>
      </div>
      <div className="navbar-menu">
        <span className="user-info">
          Welcome, {user.username} ({user.role})
        </span>
        {user.role === 'PARENT' && (
          <Link to="/parent" className="nav-link">Parent Dashboard</Link>
        )}
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;