import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaSignOutAlt,
  FaUser,
  FaBuilding,
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaChartLine,
  FaUsers,
  FaFolderOpen,
  FaExclamationTriangle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Mock data for dashboard stats
  const stats = [
    {
      title: "Total Applications",
      value: "1,234",
      icon: FaFileAlt,
      color: "#3b82f6",
      change: "+12%",
    },
    {
      title: "Pending Review",
      value: "456",
      icon: FaClock,
      color: "#f59e0b",
      change: "+5%",
    },
    {
      title: "Approved",
      value: "678",
      icon: FaCheckCircle,
      color: "#10b981",
      change: "+18%",
    },
    {
      title: "Rejected",
      value: "100",
      icon: FaTimesCircle,
      color: "#ef4444",
      change: "-3%",
    },
  ];

  const menuItems = [
    { name: "Dashboard", icon: FaChartLine, active: true },
    { name: "Applications", icon: FaFileAlt },
    { name: "Schemes", icon: FaFolderOpen },
    { name: "Users", icon: FaUsers },
    { name: "Reports", icon: FaChartLine },
  ];

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <FaBuilding />
            <span>MeroYojana</span>
          </div>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`nav-item ${item.active ? "active" : ""}`}
            >
              <item.icon className="nav-icon" />
              {sidebarOpen && <span>{item.name}</span>}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <FaUser />
            </div>
            {sidebarOpen && (
              <div className="user-details">
                <div className="user-name">{user.username}</div>
                <div className="user-role">{user.role}</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Dashboard</h1>
            <p className="header-subtitle">Welcome back, {user.username}!</p>
          </div>
          <div className="header-right">
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ color: stat.color }}>
                <stat.icon />
              </div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-title">{stat.title}</div>
                <div className="stat-change" style={{ color: stat.color }}>
                  {stat.change} from last month
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Sections */}
        <div className="dashboard-content">
          <div className="content-section">
            <div className="section-header">
              <h2>Recent Applications</h2>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="applications-table">
              <table>
                <thead>
                  <tr>
                    <th>Application ID</th>
                    <th>Citizen Name</th>
                    <th>Scheme</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#APP-2024-001</td>
                    <td>Ram Bahadur</td>
                    <td>Senior Citizen Allowance</td>
                    <td>
                      <span className="status-badge pending">Pending</span>
                    </td>
                    <td>2024-01-15</td>
                    <td>
                      <button className="action-btn">Review</button>
                    </td>
                  </tr>
                  <tr>
                    <td>#APP-2024-002</td>
                    <td>Sita Devi</td>
                    <td>Disability Allowance</td>
                    <td>
                      <span className="status-badge approved">Approved</span>
                    </td>
                    <td>2024-01-14</td>
                    <td>
                      <button className="action-btn">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td>#APP-2024-003</td>
                    <td>Hari Prasad</td>
                    <td>Education Grant</td>
                    <td>
                      <span className="status-badge rejected">Rejected</span>
                    </td>
                    <td>2024-01-13</td>
                    <td>
                      <button className="action-btn">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="content-section">
            <div className="section-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="quick-actions">
              <button className="quick-action-btn">
                <FaFileAlt />
                <span>New Application</span>
              </button>
              <button className="quick-action-btn">
                <FaFolderOpen />
                <span>Create Scheme</span>
              </button>
              <button className="quick-action-btn">
                <FaUsers />
                <span>Manage Users</span>
              </button>
              <button className="quick-action-btn">
                <FaChartLine />
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
