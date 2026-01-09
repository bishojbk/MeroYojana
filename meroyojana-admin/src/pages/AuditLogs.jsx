import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaChartLine,
  FaFolderOpen,
  FaFileAlt,
  FaShieldAlt,
  FaUsers,
  FaCog,
  FaBell,
  FaSearch,
  FaDownload,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaTimes,
  FaEye,
  FaEdit,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSignOutAlt,
} from "react-icons/fa";
import "./AuditLogs.css";

const AuditLogs = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

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
    { name: "Dashboard", icon: FaChartLine, path: "/dashboard" },
    { name: "Schemes", icon: FaFolderOpen, path: "/schemes" },
    { name: "Applications", icon: FaFileAlt, path: "/applications", badge: 12 },
    {
      name: "Doc Verification",
      icon: FaCheckCircle,
      path: "/doc-verification",
    },
    { name: "Complaints", icon: FaExclamationTriangle, path: "/complaints" },
    {
      name: "Audit Logs",
      icon: FaShieldAlt,
      path: "/audit-logs",
      active: true,
    },
  ];

  const auditLogs = [
    {
      id: 1,
      officer: {
        name: "Ram Bahadur",
        role: "Civil Officer L3",
        avatar: "RB",
        avatarColor: "blue",
      },
      office: {
        name: "Kathmandu DAO",
        dept: "Verification Unit",
      },
      action: {
        type: "approved",
        label: "✔ Approved",
        icon: FaCheck,
      },
      applicationId: "#MY-2023-8849",
      applicationType: "Citizenship Verify",
      date: "Oct 24, 2023",
      time: "10:42 AM",
    },
    {
      id: 2,
      officer: {
        name: "Sita Sharma",
        role: "Review Officer",
        avatar: "SS",
        avatarColor: "purple",
      },
      office: {
        name: "Lalitpur DAO",
        dept: "Audit Wing",
      },
      action: {
        type: "rejected",
        label: "✖ Rejected",
        icon: FaTimes,
      },
      applicationId: "#MY-2023-8821",
      applicationType: "Passport App",
      date: "Oct 24, 2023",
      time: "09:15 AM",
    },
    {
      id: 3,
      officer: {
        name: "Hari Prasad",
        role: "System Admin",
        avatar: "HP",
        avatarColor: "green",
      },
      office: {
        name: "Central Ministry",
        dept: "IT Department",
      },
      action: {
        type: "viewed",
        label: "◎ Viewed",
        icon: FaEye,
      },
      applicationId: "#SYS-LOG-992",
      applicationType: "Admin Settings",
      date: "Oct 23, 2023",
      time: "04:30 PM",
    },
    {
      id: 4,
      officer: {
        name: "Ramesh B.",
        role: "Field Officer",
        avatar: "RB",
        avatarColor: "blue",
      },
      office: {
        name: "Pokhara DAO",
        dept: "Ward 4",
      },
      action: {
        type: "updated",
        label: "✎ Updated",
        icon: FaEdit,
      },
      applicationId: "#MY-2023-5510",
      applicationType: "Land Registration",
      date: "Oct 23, 2023",
      time: "02:12 PM",
    },
    {
      id: 5,
      officer: {
        name: "Gita Rana",
        role: "Senior Clerk",
        avatar: "GR",
        avatarColor: "red",
      },
      office: {
        name: "Bhaktapur DAO",
        dept: "Records Room",
      },
      action: {
        type: "approved",
        label: "✔ Approved",
        icon: FaCheck,
      },
      applicationId: "#MY-2023-1102",
      applicationType: "Birth Certificate",
      date: "Oct 23, 2023",
      time: "11:05 AM",
    },
  ];

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="audit-logs-container">
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
              placeholder="Global Search..."
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

      <div className="audit-logs-layout">
        {/* Left Sidebar */}
        <aside className="audit-logs-sidebar">
          <div className="sidebar-logo"></div>

          <nav className="sidebar-nav">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`nav-item ${item.active ? "active" : ""}`}
                onClick={() => item.path && navigate(item.path)}
              >
                <item.icon className="nav-icon" />
                <span>{item.name}</span>
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
        <div className="audit-logs-main">
          {/* Main Content Area */}
          <div className="audit-content">
            {/* Title Section */}
            <div className="title-section">
              <h2 className="main-title">Audit & Transparency Log</h2>
              <p className="main-description">
                Track all administrative actions, document verifications, and
                system modifications.
              </p>
              <div className="system-status">
                <span className="status-badge active">
                  System Status: Active
                </span>
                <span className="last-updated">Last updated: Just now</span>
              </div>
            </div>

            {/* Filters Section */}
            <div className="filters-section">
              <div className="filter-group">
                <label>SEARCH LOGS</label>
                <div className="filter-input-wrapper">
                  <FaSearch className="filter-icon" />
                  <input
                    type="text"
                    placeholder="Search by App ID, Officer Name..."
                    className="filter-input"
                  />
                </div>
              </div>
              <div className="filter-group">
                <label>DATE RANGE</label>
                <div className="filter-input-wrapper">
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    className="filter-input"
                  />
                  <FaCalendarAlt className="filter-icon-right" />
                </div>
              </div>
              <div className="filter-group">
                <label>ACTION TYPE</label>
                <select className="filter-select">
                  <option>All Actions</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                  <option>Viewed</option>
                  <option>Updated</option>
                </select>
              </div>
              <div className="filter-group">
                <label>OFFICE</label>
                <select className="filter-select">
                  <option>All Offices</option>
                  <option>Kathmandu DAO</option>
                  <option>Lalitpur DAO</option>
                  <option>Bhaktapur DAO</option>
                </select>
              </div>
              <button className="export-btn">
                <FaDownload />
                Export
              </button>
            </div>

            {/* Audit Log Table */}
            <div className="audit-table-container">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>OFFICER</th>
                    <th>OFFICE / DEPT</th>
                    <th>ACTION</th>
                    <th>APPLICATION ID</th>
                    <th>DATE & TIME</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td>
                        <div className="officer-cell">
                          <div
                            className={`officer-avatar ${log.officer.avatarColor}`}
                          >
                            {log.officer.avatar}
                          </div>
                          <div className="officer-info">
                            <div className="officer-name">
                              {log.officer.name}
                            </div>
                            <div className="officer-role">
                              {log.officer.role}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="office-cell">
                          <div className="office-name">{log.office.name}</div>
                          <div className="office-dept">{log.office.dept}</div>
                        </div>
                      </td>
                      <td>
                        <span className={`action-badge ${log.action.type}`}>
                          {log.action.label}
                        </span>
                      </td>
                      <td>
                        <div className="application-cell">
                          <a href="#" className="application-link">
                            {log.applicationId}
                            <FaExternalLinkAlt className="link-icon" />
                          </a>
                          <div className="application-type">
                            {log.applicationType}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="datetime-cell">
                          <div className="date-text">{log.date}</div>
                          <div className="time-text">{log.time}</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
              <div className="pagination-info">
                Showing 1 to 5 of 128 results
              </div>
              <div className="pagination-controls">
                <button
                  className="pagination-btn"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                >
                  <FaChevronLeft />
                </button>
                <button
                  className={`pagination-number ${
                    currentPage === 1 ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </button>
                <button
                  className={`pagination-number ${
                    currentPage === 2 ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(2)}
                >
                  2
                </button>
                <button
                  className={`pagination-number ${
                    currentPage === 3 ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(3)}
                >
                  3
                </button>
                <span className="pagination-ellipsis">...</span>
                <button
                  className={`pagination-number ${
                    currentPage === 25 ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(25)}
                >
                  25
                </button>
                <button
                  className="pagination-btn"
                  disabled={currentPage === 25}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(25, prev + 1))
                  }
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
