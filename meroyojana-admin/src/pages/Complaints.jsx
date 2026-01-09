import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaChartLine,
  FaFolderOpen,
  FaUsers,
  FaExclamationTriangle,
  FaCog,
  FaBell,
  FaSearch,
  FaDownload,
  FaPrint,
  FaTimes,
  FaFolder,
  FaFileAlt,
  FaSync,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaFile,
  FaShieldAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Complaints.css";

const Complaints = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedComplaint, setSelectedComplaint] = useState(1);
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
    {
      name: "Complaints",
      icon: FaExclamationTriangle,
      path: "/complaints",
      active: true,
    },
    { name: "Audit Logs", icon: FaShieldAlt, path: "/audit-logs" },
  ];

  const summaryCards = [
    {
      title: "Total Complaints",
      value: "1,240",
      icon: FaFolder,
      color: "#3b82f6",
    },
    {
      title: "Pending Review",
      value: "45",
      icon: FaFileAlt,
      color: "#f59e0b",
    },
    {
      title: "In Progress",
      value: "128",
      icon: FaSync,
      color: "#8b5cf6",
    },
    {
      title: "Resolved Today",
      value: "12",
      icon: FaCheckCircle,
      color: "#10b981",
    },
  ];

  const complaints = [
    {
      id: 0,
      complaintId: "#CMP-2023-001",
      citizen: "Ram Bahadur",
      category: "Pension Delay",
      date: "12 Oct 2023",
      status: "Open",
      statusType: "open",
    },
    {
      id: 1,
      complaintId: "#CMP-2023-002",
      citizen: "Sita Devi",
      citizenId: "9845-1122-3344",
      category: "ID Verification",
      date: "11 Oct 2023",
      status: "In Review",
      statusType: "in-review",
      subject: "ID Verification Issue for Social Security",
      description:
        'My citizenship card details have a spelling error in my last name ("Davi" instead of "Devi"), causing my social security application to be rejected. I have attached the corrected recommendation letter from the Ward office.',
      attachments: 2,
    },
    {
      id: 2,
      complaintId: "#CMP-2023-003",
      citizen: "Hari Krishna",
      category: "Document Error",
      date: "10 Oct 2023",
      status: "Resolved",
      statusType: "resolved",
    },
    {
      id: 3,
      complaintId: "#CMP-2023-004",
      citizen: "Gita Sharma",
      category: "Land Records",
      date: "09 Oct 2023",
      status: "In Review",
      statusType: "in-review",
    },
    {
      id: 4,
      complaintId: "#CMP-2023-005",
      citizen: "Bishnu Prasad",
      category: "Pension Delay",
      date: "08 Oct 2023",
      status: "Open",
      statusType: "open",
    },
    {
      id: 5,
      complaintId: "#CMP-2023-006",
      citizen: "Lakshmi Doi",
      category: "Payment Issue",
      date: "07 Oct 2023",
      status: "Resolved",
      statusType: "resolved",
    },
  ];

  const selectedComplaintData = complaints[selectedComplaint];

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="complaints-container">
      {/* Top Header Bar */}
      <header className="top-header">
        <div className="header-left">
          <span className="header-title">
            <span className="brand-name">MeroYojana</span>
            <span className="brand-subtitle">Admin Portal</span>
          </span>
        </div>
        <div className="header-right">
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

      <div className="complaints-layout">
        {/* Left Sidebar */}
        <aside className="complaints-sidebar">
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
        <div className="complaints-main">
          {/* Main Content Area */}
          <div className="complaints-content">
            {/* Left Panel - Complaints List */}
            <div className="complaints-left-panel">
              {/* Title Section */}
              <div className="title-section">
                <div className="title-row">
                  <h1 className="main-title">Citizen Complaints</h1>
                  <button className="export-report-btn">
                    <FaDownload />
                    Export Report
                  </button>
                </div>
                <p className="main-description">
                  Manage and resolve issues submitted by beneficiaries.
                </p>
              </div>

              {/* Summary Cards */}
              <div className="summary-cards">
                {summaryCards.map((card, index) => (
                  <div key={index} className="summary-card">
                    <div className="card-icon" style={{ color: card.color }}>
                      <card.icon />
                    </div>
                    <div className="card-content">
                      <div className="card-value">{card.value}</div>
                      <div className="card-title">{card.title}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Filter Bar */}
              <div className="filter-bar">
                <div className="filter-search">
                  <FaSearch className="filter-search-icon" />
                  <input
                    type="text"
                    placeholder="Search by ID or Citizen"
                    className="filter-search-input"
                  />
                </div>
                <select className="filter-dropdown">
                  <option>All Statuses</option>
                  <option>Open</option>
                  <option>In Review</option>
                  <option>Resolved</option>
                </select>
                <select className="filter-dropdown">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>Last 3 Months</option>
                </select>
              </div>

              {/* Complaints Table */}
              <div className="complaints-table-container">
                <table className="complaints-table">
                  <thead>
                    <tr>
                      <th>COMPLAINT ID</th>
                      <th>CITIZEN</th>
                      <th>CATEGORY</th>
                      <th>DATE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((complaint) => (
                      <tr
                        key={complaint.id}
                        className={
                          selectedComplaint === complaint.id ? "selected" : ""
                        }
                        onClick={() => setSelectedComplaint(complaint.id)}
                      >
                        <td>{complaint.complaintId}</td>
                        <td>{complaint.citizen}</td>
                        <td>{complaint.category}</td>
                        <td>{complaint.date}</td>
                        <td>
                          <span
                            className={`status-badge ${complaint.statusType}`}
                          >
                            {complaint.status === "In Review"
                              ? "In Re"
                              : complaint.status === "Resolved"
                              ? "Re"
                              : "Op"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="pagination">
                <div className="pagination-info">
                  Showing 1 to 6 of 140 results
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
                    Previous
                  </button>
                  <button
                    className="pagination-btn"
                    disabled={currentPage === 10}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(10, prev + 1))
                    }
                  >
                    Next
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel - Complaint Details */}
            {selectedComplaintData && selectedComplaintData.description && (
              <div className="complaints-right-panel">
                {/* Header */}
                <div className="details-header">
                  <div className="details-header-left">
                    <div className="complaint-id-large">
                      {selectedComplaintData.complaintId}
                    </div>
                    <span
                      className={`status-badge-large ${selectedComplaintData.statusType}`}
                    >
                      {selectedComplaintData.status}
                    </span>
                  </div>
                  <div className="details-header-right">
                    <button className="icon-btn">
                      <FaPrint />
                    </button>
                    <button className="icon-btn">
                      <FaTimes />
                    </button>
                  </div>
                </div>

                {/* Citizen Information */}
                <div className="citizen-info-section">
                  <div className="citizen-avatar-large">
                    {selectedComplaintData.citizen
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="citizen-details">
                    <div className="citizen-name-large">
                      {selectedComplaintData.citizen}
                    </div>
                    <div className="citizen-id-large">
                      Citizen ID: {selectedComplaintData.citizenId}
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="detail-section">
                  <label className="section-label">Subject</label>
                  <div className="section-content-text">
                    {selectedComplaintData.subject}
                  </div>
                </div>

                {/* Description */}
                <div className="detail-section">
                  <label className="section-label">Description</label>
                  <div className="section-content-text">
                    {selectedComplaintData.description}
                  </div>
                </div>

                {/* Attachments */}
                <div className="detail-section">
                  <label className="section-label">
                    Attachments ({selectedComplaintData.attachments})
                  </label>
                  <div className="attachments-grid">
                    <div className="attachment-thumbnail">
                      <div className="attachment-placeholder document"></div>
                    </div>
                    <div className="attachment-thumbnail">
                      <div className="attachment-placeholder document"></div>
                    </div>
                  </div>
                </div>

                {/* Official Resolution */}
                <div className="detail-section">
                  <div className="section-header-with-icon">
                    <FaFile className="section-icon" />
                    <label className="section-label">Official Resolution</label>
                  </div>
                  <textarea
                    className="resolution-textarea"
                    placeholder="Enter official resolution..."
                    rows="4"
                  ></textarea>
                </div>

                {/* Internal Remarks */}
                <div className="detail-section">
                  <label className="section-label">Internal Remarks</label>
                  <textarea
                    className="remarks-textarea"
                    placeholder="Enter internal remarks..."
                    rows="4"
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <button className="cancel-btn">Cancel</button>
                  <button className="save-btn">Save Updates</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
