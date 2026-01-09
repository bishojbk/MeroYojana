import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
  FaTimes,
  FaCheck,
  FaTimesCircle,
  FaEllipsisV,
  FaUserCircle,
  FaFile,
  FaFolder,
  FaClock,
  FaCog,
} from "react-icons/fa";
import "./Applications.css";

const Applications = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("under-review");
  const [selectedApplication, setSelectedApplication] = useState(0);
  const [activeDetailTab, setActiveDetailTab] = useState("details");
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
    {
      name: "Applications",
      icon: FaFileAlt,
      path: "/applications",
      active: true,
      badge: 12,
    },
    {
      name: "Doc Verification",
      icon: FaCheckCircle,
      path: "/doc-verification",
    },
    { name: "Complaints", icon: FaExclamationTriangle, path: "/complaints" },
    { name: "Audit Logs", icon: FaShieldAlt, path: "/audit-logs" },
  ];

  const statusTabs = [
    { id: "all", label: "All Status", count: null },
    { id: "under-review", label: "Under Review", count: 12 },
    { id: "submitted", label: "Submitted", count: null },
    { id: "verified", label: "Verified", count: null },
  ];

  const applications = [
    {
      id: 0,
      name: "Ram Bahadur Thapa",
      initials: "RB",
      avatarColor: "blue",
      citizenshipId: "12-01-74-00123",
      scheme: "Old Age Allowance",
      date: "2023-10-25",
      status: "Under Review",
      statusType: "under-review",
    },
    {
      id: 1,
      name: "Sita Kumari",
      initials: "SK",
      avatarColor: "purple",
      citizenshipId: "12-01-74-00145",
      scheme: "Single Woman Allowance",
      date: "2023-10-24",
      status: "Submitted",
      statusType: "submitted",
    },
    {
      id: 2,
      name: "Hari Prasad",
      initials: "HP",
      avatarColor: "green",
      citizenshipId: "12-01-74-00167",
      scheme: "Disability Grant",
      date: "2023-10-23",
      status: "Verified",
      statusType: "verified",
    },
    {
      id: 3,
      name: "Gita Sharma",
      initials: "GS",
      avatarColor: "red",
      citizenshipId: "12-01-74-00189",
      scheme: "Child Nutrition",
      date: "2023-10-22",
      status: "Rejected",
      statusType: "rejected",
    },
    {
      id: 4,
      name: "Bina Magar",
      initials: "BM",
      avatarColor: "grey",
      citizenshipId: "12-01-74-00201",
      scheme: "Unemployment Benefit",
      date: "2023-10-21",
      status: "Submitted",
      statusType: "submitted",
    },
  ];

  const selectedApp = applications[selectedApplication];

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="applications-container">
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
              placeholder="Search by Citizenship ID or Name"
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

      <div className="applications-layout">
        {/* Left Sidebar */}
        <aside className="applications-sidebar">
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

        {/* Main Content - Two Panels */}
        <div className="applications-main">
          {/* Left Panel - Application List */}
          <div className="applications-left-panel">
            {/* Status Tabs */}
            <div className="status-tabs">
              {statusTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`status-tab ${
                    selectedTab === tab.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedTab(tab.id)}
                >
                  {tab.label}
                  {tab.count && <span className="tab-badge">{tab.count}</span>}
                </button>
              ))}
            </div>

            {/* Summary */}
            <div className="applications-summary">
              Showing 1-10 of 145 applications
            </div>

            {/* Applications Table */}
            <div className="applications-table-container">
              <table className="applications-table">
                <thead>
                  <tr>
                    <th>APPLICANT NAME</th>
                    <th>CITIZENSHIP ID</th>
                    <th>SCHEME</th>
                    <th>DATE</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr
                      key={index}
                      className={
                        selectedApplication === app.id ? "selected" : ""
                      }
                      onClick={() => setSelectedApplication(app.id)}
                    >
                      <td>
                        <div className="applicant-cell">
                          <div
                            className={`applicant-avatar ${app.avatarColor}`}
                          >
                            {app.initials}
                          </div>
                          <span className="applicant-name">{app.name}</span>
                        </div>
                      </td>
                      <td>{app.citizenshipId}</td>
                      <td>{app.scheme}</td>
                      <td>{app.date}</td>
                      <td>
                        <span className={`status-badge ${app.statusType}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Panel - Application Details */}
          <div className="applications-right-panel">
            {selectedApp && (
              <>
                {/* Applicant Header */}
                <div className="applicant-header">
                  <div className="applicant-header-left">
                    <div
                      className={`applicant-avatar-large ${selectedApp.avatarColor}`}
                    >
                      <FaUserCircle />
                    </div>
                    <div className="applicant-header-info">
                      <div className="applicant-name-large">
                        {selectedApp.name}
                      </div>
                      <div className="applicant-id-large">
                        {selectedApp.citizenshipId}
                      </div>
                    </div>
                  </div>
                  <div className="applicant-header-right">
                    <span
                      className={`status-badge-large ${selectedApp.statusType}`}
                    >
                      {selectedApp.status}
                    </span>
                    <button className="close-details-btn">
                      <FaTimes />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <button className="approve-btn">
                    <FaCheck />
                    Approve
                  </button>
                  <button className="reject-btn">
                    <FaTimesCircle />
                    Reject
                  </button>
                  <button className="more-options-btn">
                    <FaEllipsisV />
                  </button>
                </div>

                {/* Detail Tabs */}
                <div className="detail-tabs">
                  <button
                    className={`detail-tab ${
                      activeDetailTab === "details" ? "active" : ""
                    }`}
                    onClick={() => setActiveDetailTab("details")}
                  >
                    Details
                  </button>
                  <button
                    className={`detail-tab ${
                      activeDetailTab === "documents" ? "active" : ""
                    }`}
                    onClick={() => setActiveDetailTab("documents")}
                  >
                    Documents
                  </button>
                  <button
                    className={`detail-tab ${
                      activeDetailTab === "history" ? "active" : ""
                    }`}
                    onClick={() => setActiveDetailTab("history")}
                  >
                    History
                  </button>
                </div>

                {/* Detail Content */}
                <div className="detail-content">
                  {activeDetailTab === "details" && (
                    <>
                      {/* Personal Information */}
                      <div className="detail-section">
                        <div className="section-header">
                          <FaUserCircle className="section-icon" />
                          <h3>Personal Information</h3>
                        </div>
                        <div className="section-content">
                          <div className="info-row">
                            <span className="info-label">Date of Birth:</span>
                            <span className="info-value">
                              1950-04-12 (73 yrs)
                            </span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">Gender:</span>
                            <span className="info-value">Male</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">Father's Name:</span>
                            <span className="info-value">
                              Shyam Bahadur Thapa
                            </span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">
                              Permanent Address:
                            </span>
                            <span className="info-value">
                              Ward 4, Dhulikhel, Kavrepalanchok, Bagmati
                              Province
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Scheme Application */}
                      <div className="detail-section">
                        <div className="section-header">
                          <FaFile className="section-icon" />
                          <h3>Scheme Application</h3>
                        </div>
                        <div className="section-content">
                          <div className="scheme-info">
                            <div className="scheme-name-row">
                              <span className="scheme-name">
                                Old Age Allowance
                              </span>
                              <FaCheckCircle className="scheme-check-icon" />
                            </div>
                            <div className="scheme-subtitle">
                              Social Security Fund
                            </div>
                            <div className="info-row">
                              <span className="info-label">Applied On:</span>
                              <span className="info-value">2023-10-25</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Documents */}
                      <div className="detail-section">
                        <div className="section-header">
                          <FaFolder className="section-icon" />
                          <h3>Documents (3)</h3>
                          <a href="#" className="view-all-link">
                            View All
                          </a>
                        </div>
                        <div className="section-content">
                          <div className="documents-grid">
                            <div className="document-thumbnail">
                              <div className="document-placeholder green"></div>
                            </div>
                            <div className="document-thumbnail">
                              <div className="document-placeholder beige"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="detail-section">
                        <div className="section-header">
                          <FaClock className="section-icon" />
                          <h3>Timeline</h3>
                        </div>
                        <div className="section-content">
                          <div className="timeline-item">
                            <div className="timeline-dot yellow"></div>
                            <div className="timeline-content">
                              <div className="timeline-text">
                                Today, 10:30 AM - Marked as "Under Review" by
                                Officer Sharma
                              </div>
                            </div>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-dot blue"></div>
                            <div className="timeline-content">
                              <div className="timeline-text">
                                2023-10-25, 02:15 PM - Application Submitted via
                                Citizen Portal (App)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeDetailTab === "documents" && (
                    <div className="documents-tab-content">
                      <p>Documents tab content</p>
                    </div>
                  )}

                  {activeDetailTab === "history" && (
                    <div className="history-tab-content">
                      <p>History tab content</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
