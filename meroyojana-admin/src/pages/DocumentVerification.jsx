import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaHome,
  FaFolderOpen,
  FaFileAlt,
  FaCheckCircle,
  FaChartLine,
  FaUsers,
  FaShieldAlt,
  FaBell,
  FaSearch,
  FaCog,
  FaCheck,
  FaTimesCircle,
  FaRedo,
  FaDownload,
  FaSearchPlus,
  FaSearchMinus,
  FaExclamationTriangle,
  FaSignOutAlt,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import "./DocumentVerification.css";

const DocumentVerification = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedTask, setSelectedTask] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      active: true,
    },
    { name: "Complaints", icon: FaExclamationTriangle, path: "/complaints" },
    { name: "Audit Logs", icon: FaShieldAlt, path: "/audit-logs" },
  ];

  const filterTabs = [
    { id: "all", label: "All", count: 12 },
    { id: "urgent", label: "Urgent", count: null },
    { id: "citizenship", label: "Citizenship", count: null },
    { id: "land", label: "Land", count: null },
  ];

  const verificationTasks = [
    {
      id: 0,
      name: "Ram Bahadur Thapa",
      documentType: "Citizenship Certificate Front/Back",
      timeAgo: "2 hrs ago",
      scheme: "Old Age Allowance",
      badge: "Due Today",
      badgeType: "urgent",
      date: null,
    },
    {
      id: 1,
      name: "Sita Devi Sharma",
      documentType: "Relationship Certificate",
      timeAgo: "5 hrs ago",
      scheme: "Widow Support",
      badge: null,
      badgeType: null,
      date: "Nov 07",
    },
    {
      id: 2,
      name: "Hari Prasad Koirala",
      documentType: "Land Ownership Document (Lalpurja)",
      timeAgo: "1 day ago",
      scheme: "Farm Subsidy",
      badge: null,
      badgeType: null,
      date: "Nov 08",
    },
    {
      id: 3,
      name: "Gita Kumari Rai",
      documentType: "Birth Certificate",
      timeAgo: "2 days ago",
      scheme: "Child Nutrition",
      badge: null,
      badgeType: null,
      date: "Nov 10",
    },
  ];

  const selectedTaskData = verificationTasks[selectedTask];

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 50));
  };

  const handleFullscreen = () => {
    const viewer = document.querySelector(".document-viewer");
    if (!isFullscreen) {
      if (viewer.requestFullscreen) {
        viewer.requestFullscreen();
      } else if (viewer.webkitRequestFullscreen) {
        viewer.webkitRequestFullscreen();
      } else if (viewer.msRequestFullscreen) {
        viewer.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="verification-container">
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

      <div className="verification-layout">
        {/* Left Sidebar */}
        <aside className="verification-sidebar">
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
        <div className="verification-main">
          {/* Left Panel - Verification Queue */}
          <div className="verification-left-panel">
            {/* Search Bar */}
            <div className="queue-search">
              <FaSearch className="queue-search-icon" />
              <input
                type="text"
                placeholder="Search Citizen ID or Name..."
                className="queue-search-input"
              />
            </div>

            {/* Filter Tabs */}
            <div className="filter-tabs">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`filter-tab ${
                    selectedTab === tab.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedTab(tab.id)}
                >
                  {tab.label}
                  {tab.count && <span className="tab-badge">{tab.count}</span>}
                </button>
              ))}
            </div>

            {/* Verification Task List */}
            <div className="task-list">
              {verificationTasks.map((task, index) => (
                <div
                  key={index}
                  className={`task-item ${
                    selectedTask === task.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedTask(task.id)}
                >
                  <div className="task-header">
                    <div className="task-name">{task.name}</div>
                    {task.badge && (
                      <span className={`task-badge ${task.badgeType}`}>
                        {task.badge}
                      </span>
                    )}
                  </div>
                  <div className="task-document">{task.documentType}</div>
                  <div className="task-footer">
                    <span className="task-time">{task.timeAgo}</span>
                    {task.date && (
                      <span className="task-date">{task.date}</span>
                    )}
                  </div>
                  <div className="task-scheme">{task.scheme}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Document Viewer */}
          <div className="verification-right-panel">
            {selectedTaskData && (
              <>
                {/* Applicant Header */}
                <div className="applicant-header-verification">
                  <div className="applicant-header-left">
                    <div className="applicant-name-verification">
                      {selectedTaskData.name}
                    </div>
                    <div className="applicant-details">
                      <span className="detail-item">
                        ID:{" "}
                        <strong>
                          {selectedTaskData.name === "Ram Bahadur Thapa"
                            ? "12-01-74-00123"
                            : "N/A"}
                        </strong>
                      </span>
                      <span className="detail-item">
                        Scheme: <strong>{selectedTaskData.scheme}</strong>
                      </span>
                      <span className="detail-item">
                        Submitted: <strong>2023-11-04</strong>
                      </span>
                      <span className="detail-item">
                        Assigned Office: <strong>Ward No. 4, Kathmandu</strong>
                      </span>
                    </div>
                  </div>
                  <div className="applicant-header-right">
                    <span className="status-badge-verification pending">
                      Pending Review
                    </span>
                  </div>
                </div>

                {/* Document Viewer Controls */}
                <div className="document-controls">
                  <div className="zoom-controls">
                    <button className="control-btn" onClick={handleZoomOut}>
                      <FaSearchMinus />
                    </button>
                    <span className="zoom-level">{zoomLevel}%</span>
                    <button className="control-btn" onClick={handleZoomIn}>
                      <FaSearchPlus />
                    </button>
                    <button
                      className="control-btn fullscreen-btn"
                      onClick={handleFullscreen}
                      title="View Fullscreen"
                    >
                      {isFullscreen ? <FaCompress /> : <FaExpand />}
                    </button>
                  </div>
                  <div className="other-controls">
                    <button className="control-btn">
                      <FaRedo />
                    </button>
                    <button className="control-btn">
                      <FaDownload />
                    </button>
                  </div>
                </div>

                {/* Document Display */}
                <div className="document-viewer">
                  <div
                    className="document-image-container"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                  >
                    <div className="document-placeholder-large">
                      {/* This would be the actual document image */}
                      <div className="document-content">
                        <div className="document-text">
                          <p>Official Certificate</p>
                          <p>Nepali Script Content</p>
                          <p>Red and Blue Stamps</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Document Thumbnails */}
                <div className="document-thumbnails">
                  <div className="thumbnail-item">
                    <div className="thumbnail-placeholder"></div>
                  </div>
                  <div className="thumbnail-item">
                    <div className="thumbnail-placeholder"></div>
                  </div>
                </div>

                {/* Official Remarks */}
                <div className="remarks-section">
                  <label className="remarks-label">
                    Official Remarks <span className="required">*</span>
                    <span className="remarks-hint">
                      (Required for rejection)
                    </span>
                  </label>
                  <textarea
                    className="remarks-textarea"
                    placeholder="Enter verification notes or reason for rejection (Supports Nepali Unicode)..."
                    rows="4"
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="verification-actions">
                  <button className="verify-approve-btn">
                    <FaCheck />
                    Verify & Approve
                  </button>
                  <button className="reject-btn-verification">
                    <FaTimesCircle />
                    Reject
                  </button>
                  <button className="resubmit-btn">
                    <FaRedo />
                    Resubmit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentVerification;
