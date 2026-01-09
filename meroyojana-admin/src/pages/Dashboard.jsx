import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaSignOutAlt,
  FaUser,
  FaHome,
  FaFolderOpen,
  FaFileAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChartLine,
  FaUsers,
  FaShieldAlt,
  FaBell,
  FaSearch,
  FaDownload,
  FaArrowUp,
  FaThumbsUp,
  FaCalendarAlt,
  FaEllipsisV,
  FaTrophy,
  FaCog,
} from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    // Set mock user if not already set
    if (!user) {
      if (!localStorage.getItem("token")) {
        localStorage.setItem("token", "mock-token");
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-profile-dropdown")) {
        setProfileDropdownOpen(false);
      }
    };
    if (profileDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", icon: FaChartLine, active: true, path: "/dashboard" },
    { name: "Schemes", icon: FaFolderOpen, path: "/schemes" },
    { name: "Applications", icon: FaFileAlt, badge: 12, path: "/applications" },
    {
      name: "Doc Verification",
      icon: FaCheckCircle,
      path: "/doc-verification",
    },
    { name: "Complaints", icon: FaExclamationTriangle, path: "/complaints" },
    { name: "Audit Logs", icon: FaShieldAlt, path: "/audit-logs" },
  ];

  // Application flow data for bar chart
  const applicationFlowData = [
    { status: "Submitted", count: 8500, color: "#3b82f6" },
    { status: "Review", count: 2400, color: "#f59e0b" },
    { status: "Verification", count: 450, color: "#60a5fa" },
    { status: "Approved", count: 8200, color: "#10b981" },
    { status: "Rejected", count: 320, color: "#ef4444" },
  ];

  // Verification delay data
  const verificationDelayData = [
    { ward: "Ward 12", days: 14, color: "#ef4444" },
    { ward: "Ward 04", days: 9, color: "#f59e0b" },
    { ward: "Ward 08", days: 6, color: "#f59e0b" },
    { ward: "Ward 01", days: 2, color: "#10b981" },
    { ward: "Ward 03", days: 1, color: "#10b981" },
  ];

  const maxDelay = Math.max(...verificationDelayData.map((d) => d.days));

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Top Header Bar */}
      <header className="top-header">
        <div className="header-left">
          <span className="header-title">
            <span className="brand-name">MeroYojana</span>
            <span className="brand-subtitle">Admin Portal</span>
          </span>
        </div>
        <div className="header-right">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search application ID, citizen name..."
              className="search-input"
            />
          </div>
          <div className="notification-icon-wrapper">
            <FaBell className="header-icon" />
          </div>
          <div className="user-profile-dropdown">
            <div
              className="user-profile-trigger"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <div className="user-header-info">
                <div className="user-header-name">
                  {user.username || "Officer Sharma"}
                </div>
                <div className="user-header-office">
                  {user.office || "Kathmandu Metro"}
                </div>
              </div>
              <div className="user-header-avatar">
                <FaUser />
              </div>
            </div>
            {profileDropdownOpen && (
              <div className="profile-dropdown-menu">
                <div
                  className="dropdown-item"
                  onClick={() => navigate("/profile")}
                >
                  <FaUser className="dropdown-icon" />
                  <span>My Profile</span>
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => navigate("/settings")}
                >
                  <FaCog className="dropdown-icon" />
                  <span>Settings</span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" onClick={handleLogout}>
                  <FaSignOutAlt className="dropdown-icon" />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="dashboard-layout">
        {/* Left Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-logo"></div>

          <nav className="sidebar-nav">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`nav-item ${item.active ? "active" : ""}`}
                onClick={() => item.path && navigate(item.path)}
                style={{ cursor: item.path ? "pointer" : "default" }}
              >
                <item.icon className="nav-icon" />
                <span>{item.name}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="sign-out-item" onClick={handleLogout}>
              <FaSignOutAlt className="nav-icon" />
              <span>Sign Out</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="dashboard-main">
          {/* Breadcrumbs and Title */}
          <div className="page-header">
            <div className="breadcrumbs">Home &gt; Dashboard</div>
            <div className="page-title-row">
              <h1 className="page-title">Overview</h1>
              <button className="export-btn">
                <FaDownload />
                Export Report
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="filters-section">
            <div className="filter-group">
              <label>Scheme Type</label>
              <select className="filter-select">
                <option>All Schemes</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Office Level</label>
              <select className="filter-select">
                <option>All Wards</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Date Range</label>
              <select className="filter-select">
                <option>Last 30 Days</option>
              </select>
              <FaCalendarAlt className="calendar-icon" />
            </div>
            <button className="apply-filters-btn">Apply Filters</button>
          </div>

          {/* Key Metrics Cards */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon folder-icon">
                <FaFolderOpen />
              </div>
              <div className="metric-content">
                <div className="metric-value">12</div>
                <div className="metric-title">Total Schemes</div>
                <div className="metric-change positive">
                  <FaArrowUp /> 2 new this month
                </div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon trophy-icon">
                <FaTrophy />
              </div>
              <div className="metric-content">
                <div className="metric-value">1,240</div>
                <div className="metric-title">Pending Applications</div>
                <div className="metric-change warning">
                  ! Requires attention
                </div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon check-icon">
                <FaCheckCircle />
              </div>
              <div className="metric-content">
                <div className="metric-value">450</div>
                <div className="metric-title">Pending Verification</div>
                <div className="metric-subtitle">Across 32 wards</div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon thumbs-icon">
                <FaThumbsUp />
              </div>
              <div className="metric-content">
                <div className="metric-value">8,500 Approved</div>
                <div className="metric-title">Decisions Made</div>
                <div className="metric-change negative">
                  320 Rejected (3.6%)
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            <div className="chart-card">
              <div className="chart-header">
                <h3>Application Flow Status</h3>
                <FaEllipsisV className="chart-menu" />
              </div>
              <div className="bar-chart">
                {applicationFlowData.map((item, index) => (
                  <div key={index} className="bar-chart-item">
                    <div className="bar-wrapper">
                      <div
                        className="bar"
                        style={{
                          height: `${(item.count / 8500) * 100}%`,
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>
                    <div className="bar-label">{item.status}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>Avg. Verification Delay (Days)</h3>
                <select className="chart-dropdown">
                  <option>By Ward</option>
                </select>
              </div>
              <div className="horizontal-bar-chart">
                {verificationDelayData.map((item, index) => (
                  <div key={index} className="horizontal-bar-item">
                    <div className="bar-ward-label">{item.ward}</div>
                    <div className="horizontal-bar-wrapper">
                      <div
                        className="horizontal-bar"
                        style={{
                          width: `${(item.days / maxDelay) * 100}%`,
                          backgroundColor: item.color,
                        }}
                      ></div>
                      <span className="bar-days">{item.days} Days</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Applications Table */}
          <div className="table-section">
            <div className="table-header">
              <h3>Recent Applications</h3>
              <a href="#" className="view-all-link">
                View All
              </a>
            </div>
            <div className="applications-table">
              <table>
                <thead>
                  <tr>
                    <th>APP ID</th>
                    <th>APPLICANT</th>
                    <th>SCHEME</th>
                    <th>SUBMITTED</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>APP-2024-001</td>
                    <td>Ram Bahadur</td>
                    <td>Senior Citizen Allowance</td>
                    <td>2024-01-15</td>
                    <td>
                      <span className="status-badge pending">Pending</span>
                    </td>
                    <td>
                      <button className="action-btn">Review</button>
                    </td>
                  </tr>
                  <tr>
                    <td>APP-2024-002</td>
                    <td>Sita Devi</td>
                    <td>Disability Allowance</td>
                    <td>2024-01-14</td>
                    <td>
                      <span className="status-badge approved">Approved</span>
                    </td>
                    <td>
                      <button className="action-btn">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td>APP-2024-003</td>
                    <td>Hari Prasad</td>
                    <td>Education Grant</td>
                    <td>2024-01-13</td>
                    <td>
                      <span className="status-badge rejected">Rejected</span>
                    </td>
                    <td>
                      <button className="action-btn">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
