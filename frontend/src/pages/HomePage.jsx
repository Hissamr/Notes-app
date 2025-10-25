import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import './HomePage.css';

function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            📝 Smart Notes for <span className="highlight">Families</span>
          </h1>
          <p className="hero-subtitle">
            A secure note-taking app designed for parents and children to stay organized together. 
            Track tasks, share important information, and collaborate seamlessly.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleGetStarted}>
              {user ? 'Go to Dashboard' : 'Get Started Free'}
            </button>
            {!user && (
              <Link to="/login" className="btn-secondary">
                Sign In
              </Link>
            )}
          </div>
          <p className="hero-note">
            ✨ No credit card required • Free forever
          </p>
        </div>
        <div className="hero-image">
          <div className="note-preview">
            <div className="note-card">
              <div className="note-header">
                <span className="note-icon">✓</span>
                <span className="note-title">Homework Due Friday</span>
              </div>
              <p className="note-text">Math assignment pages 45-47</p>
              <div className="note-tags">
                <span className="tag">school</span>
                <span className="tag">urgent</span>
              </div>
            </div>
            <div className="note-card">
              <div className="note-header">
                <span className="note-icon">📚</span>
                <span className="note-title">Reading List</span>
              </div>
              <p className="note-text">Chapter 5: The Great Adventure</p>
              <div className="note-tags">
                <span className="tag">books</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Notes App?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👨‍👩‍👧</div>
            <h3>Parent-Child Collaboration</h3>
            <p>
              Parents can monitor their children's notes and to-do lists in real-time. 
              Stay connected and help them stay organized.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Task Management</h3>
            <p>
              Create checkbox-style to-do items or regular notes. 
              Track completion status and never miss important tasks.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📁</div>
            <h3>Organize with Folders</h3>
            <p>
              Group notes by subject, project, or category. 
              Keep everything organized and easy to find.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏷️</div>
            <h3>Smart Tags</h3>
            <p>
              Add tags to notes for quick filtering and searching. 
              Find what you need instantly.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>
              Your data is protected with JWT authentication and role-based access. 
              Only authorized users can view notes.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>
              Works seamlessly on desktop, tablet, and mobile devices. 
              Access your notes anywhere, anytime.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create an Account</h3>
            <p>Sign up as a parent or child in seconds. Choose your role and get started.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Link Family Members</h3>
            <p>Parents can link their children's accounts to monitor their notes and progress.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Start Creating Notes</h3>
            <p>Create notes, organize with folders and tags, and track tasks with checkboxes.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Get Organized?</h2>
        <p>Join hundreds of families staying organized with Notes App</p>
        <button className="btn-cta" onClick={handleGetStarted}>
          {user ? 'Go to Dashboard' : 'Start Free Now'}
        </button>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Notes App</h4>
            <p>Smart note-taking for families</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
            <Link to="/forgot-password">Reset Password</Link>
          </div>
          <div className="footer-section">
            <h4>Tech Stack</h4>
            <p>React • Spring Boot • PostgreSQL</p>
            <p>JWT Authentication • REST API</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Notes App. Built with ❤️ for families.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
