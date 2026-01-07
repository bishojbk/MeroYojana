import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaBuilding,
  FaShieldAlt,
  FaFolderOpen,
} from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(username, password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message || "Invalid credentials. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      {/* Header */}
      <header className="login-header">
        <div className="header-left">
          <FaBuilding className="header-icon" />
          <span className="header-title">MeroYojana - Admin Portal</span>
        </div>
        <div className="header-right">
          <button className="language-btn">English / Nepali</button>
          <div className="flag-icon">🇳🇵</div>
        </div>
      </header>

      {/* Main Content */}
      <div className="login-main">
        {/* Left Panel */}
        <div className="login-left-panel">
          <div className="feature-card-large">
            <div className="feature-image-overlay">
              <h2 className="feature-title">
                Digital Governance for a Better Future
              </h2>
              <p className="feature-description">
                Empowering officials with efficient tools for welfare management
                and citizen services.
              </p>
            </div>
          </div>

          <div className="feature-cards-small">
            <div className="feature-card-small">
              <div className="feature-icon-wrapper">
                <FaShieldAlt className="feature-icon" />
              </div>
              <h3 className="feature-card-title">Secure Access</h3>
              <p className="feature-card-text">
                End-to-end encrypted portal for sensitive government data.
              </p>
            </div>

            <div className="feature-card-small">
              <div className="feature-icon-wrapper">
                <FaFolderOpen className="feature-icon" />
              </div>
              <h3 className="feature-card-title">Document Verify</h3>
              <p className="feature-card-text">
                Streamlined verification process for citizen applications.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="login-right-panel">
          <div className="login-card">
            <div className="login-icon-wrapper">
              <div className="login-icon">G</div>
            </div>

            <h1 className="login-title">Admin Login</h1>
            <p className="login-subtitle">
              Please verify your credentials to proceed.
            </p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="username">Username / Email ID</label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your official ID"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="security-message">
              Protected by Nepal Government Cyber Security. Unauthorized access
              is a punishable offense.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="login-footer">
        <div className="footer-links">
          <a href="#help">Help & Support</a>
          <a href="#manual">User Manual</a>
          <a href="#privacy">Privacy Policy</a>
        </div>
        <div className="footer-copyright">
          © 2024 Government of Nepal. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Login;
