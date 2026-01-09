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
  FaDownload,
  FaPlus,
  FaCalendarAlt,
  FaTimes,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaCog,
  FaUpload,
  FaImage,
  FaFile,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import "./Schemes.css";

const Schemes = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [documents, setDocuments] = useState([
    {
      name: "Citizenship Certificate",
      verifyAt: "DAO",
      file: null,
      fileName: "",
    },
    {
      name: "Land Ownership Proof",
      verifyAt: "Malpot",
      file: null,
      fileName: "",
    },
  ]);

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
    { name: "Schemes", icon: FaFolderOpen, path: "/schemes", active: true },
    { name: "Applications", icon: FaFileAlt, path: "/applications", badge: 12 },
    {
      name: "Doc Verification",
      icon: FaCheckCircle,
      path: "/doc-verification",
    },
    { name: "Complaints", icon: FaExclamationTriangle, path: "/complaints" },
    { name: "Audit Logs", icon: FaShieldAlt, path: "/audit-logs" },
  ];

  const schemes = [
    {
      id: "SCH-2024-001",
      name: "PM Agriculture Modernization",
      level: "Federal",
      levelColor: "purple",
      status: "Active",
      statusType: "active",
    },
    {
      id: "SCH-2024-045",
      name: "Youth Self-Employment Fund",
      level: "Provincial",
      levelColor: "blue",
      status: "Active",
      statusType: "active",
    },
    {
      id: "SCH-2024-089",
      name: "Dalit Community Scholarship",
      level: "Local",
      levelColor: "orange",
      status: "Draft",
      statusType: "draft",
    },
    {
      id: "SCH-2023-992",
      name: "Senior Citizen Allowance",
      level: "Federal",
      levelColor: "purple",
      status: "Closed",
      statusType: "closed",
    },
  ];

  const handleAddDocument = () => {
    setDocuments([
      ...documents,
      { name: "", verifyAt: "DAO", file: null, fileName: "" },
    ]);
  };

  const handleRemoveDocument = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleDocumentChange = (index, field, value) => {
    const updated = [...documents];
    updated[index][field] = value;
    setDocuments(updated);
  };

  const handleFileUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updated = [...documents];
      updated[index].file = file;
      updated[index].fileName = file.name;
      setDocuments(updated);
    }
  };

  const handleRemoveFile = (index) => {
    const updated = [...documents];
    updated[index].file = null;
    updated[index].fileName = "";
    setDocuments(updated);
  };

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="schemes-container">
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
              placeholder="Global search..."
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

      <div className="schemes-layout">
        {/* Left Sidebar */}
        <aside className="schemes-sidebar">
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
        <div className="schemes-main">
          {/* Title and Actions */}
          <div className="schemes-header">
            <div className="schemes-title-section">
              <h1 className="schemes-title">Welfare Schemes</h1>
              <div className="breadcrumbs">Home &gt; Scheme Management</div>
              <p className="schemes-subtitle">
                Manage government welfare schemes, deadlines, and requirements.
              </p>
            </div>
            <div className="schemes-actions">
              <button className="export-btn">
                <FaDownload />
                Export
              </button>
              <button
                className="create-scheme-btn"
                onClick={() => setSidebarOpen(true)}
              >
                <FaPlus />
                Create Scheme
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="schemes-filters">
            <div className="filter-search">
              <FaSearch className="filter-search-icon" />
              <input
                type="text"
                placeholder="Search by scheme name"
                className="filter-search-input"
              />
            </div>
            <select className="filter-dropdown">
              <option>All Levels</option>
              <option>Federal</option>
              <option>Provincial</option>
              <option>Local</option>
            </select>
            <select className="filter-dropdown">
              <option>Any Status</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Closed</option>
            </select>
            <button className="filter-icon-btn">
              <FaFilter />
            </button>
          </div>

          {/* Schemes Table */}
          <div className="schemes-table-container">
            <table className="schemes-table">
              <thead>
                <tr>
                  <th>SCHEME NAME</th>
                  <th>LEVEL</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {schemes.map((scheme, index) => (
                  <tr key={index}>
                    <td>
                      <div className="scheme-name-cell">
                        <div className="scheme-name">{scheme.name}</div>
                        <div className="scheme-id">{scheme.id}</div>
                      </div>
                    </td>
                    <td>
                      <span className={`level-badge ${scheme.levelColor}`}>
                        {scheme.level}
                      </span>
                    </td>
                    <td>
                      <div className="status-cell">
                        <span
                          className={`status-dot ${scheme.statusType}`}
                        ></span>
                        <span>{scheme.status}</span>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons-cell">
                        <button
                          className="action-btn-edit"
                          onClick={() => {
                            // Handle edit action
                            console.log("Edit scheme:", scheme.id);
                          }}
                          title="Edit Scheme"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="action-btn-delete"
                          onClick={() => {
                            // Handle delete action
                            console.log("Delete scheme:", scheme.id);
                          }}
                          title="Delete Scheme"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <div className="pagination-info">Showing 1-4 of 24 schemes</div>
            <div className="pagination-controls">
              <button className="pagination-btn" disabled>
                <FaChevronLeft />
                Previous
              </button>
              <button className="pagination-btn">
                Next
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Blur Overlay */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Right Sidebar - Create Scheme */}
        {sidebarOpen && (
          <div className="create-scheme-sidebar">
            <div className="sidebar-header">
              <h2>Create New Scheme</h2>
              <button
                className="close-btn"
                onClick={() => setSidebarOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="sidebar-content">
              {/* Basic Details */}
              <div className="form-section">
                <h3 className="section-title">BASIC DETAILS</h3>
                <div className="form-group">
                  <label>Scheme Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Women Entrepreneurship Loan"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Govt. Level</label>
                  <select className="form-select">
                    <option>Federal</option>
                    <option>Provincial</option>
                    <option>Local</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Deadline</label>
                  <div className="date-input-wrapper">
                    <input
                      type="text"
                      placeholder="mm/dd/yyyy"
                      className="form-input"
                    />
                    <FaCalendarAlt className="calendar-icon-input" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Brief description of the scheme..."
                    className="form-textarea"
                    rows="4"
                  ></textarea>
                </div>
              </div>

              {/* Required Documents */}
              <div className="form-section">
                <div className="section-header-row">
                  <h3 className="section-title">REQUIRED DOCUMENTS</h3>
                  <button className="add-doc-btn" onClick={handleAddDocument}>
                    <FaPlus />
                    Add Doc
                  </button>
                </div>
                {documents.map((doc, index) => (
                  <div key={index} className="document-item">
                    <div className="form-group document-name-group">
                      <input
                        type="text"
                        value={doc.name}
                        onChange={(e) =>
                          handleDocumentChange(index, "name", e.target.value)
                        }
                        placeholder="Document name"
                        className="form-input"
                      />
                      {documents.length > 1 && (
                        <button
                          className="remove-doc-btn"
                          onClick={() => handleRemoveDocument(index)}
                          type="button"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Verify at:</label>
                      <select
                        className="form-select"
                        value={doc.verifyAt}
                        onChange={(e) =>
                          handleDocumentChange(
                            index,
                            "verifyAt",
                            e.target.value
                          )
                        }
                      >
                        <option>DAO</option>
                        <option>Malpot</option>
                        <option>Other</option>
                      </select>
                    </div>

                    {/* File Upload Section */}
                    <div className="form-group">
                      <label>Attach Document/Image:</label>
                      {!doc.file ? (
                        <div className="file-upload-area">
                          <input
                            type="file"
                            id={`file-upload-${index}`}
                            className="file-input"
                            accept="image/*,.pdf,.doc,.docx"
                            onChange={(e) => handleFileUpload(index, e)}
                          />
                          <label
                            htmlFor={`file-upload-${index}`}
                            className="file-upload-label"
                          >
                            <FaUpload className="upload-icon" />
                            <span>Click to upload or drag and drop</span>
                            <span className="file-upload-hint">
                              PDF, DOC, DOCX, or Images (MAX. 10MB)
                            </span>
                          </label>
                        </div>
                      ) : (
                        <div className="file-preview">
                          <div className="file-preview-info">
                            {doc.fileName.match(
                              /\.(jpg|jpeg|png|gif|webp)$/i
                            ) ? (
                              <FaImage className="file-icon" />
                            ) : (
                              <FaFile className="file-icon" />
                            )}
                            <span className="file-name">{doc.fileName}</span>
                            <span className="file-size">
                              {(doc.file.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                          <button
                            type="button"
                            className="remove-file-btn"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      )}
                    </div>

                    {index === documents.length - 1 && (
                      <button
                        className="add-another-btn"
                        onClick={handleAddDocument}
                      >
                        <FaPlus />
                        Add Another Document
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="sidebar-footer-buttons">
              <button
                className="cancel-btn"
                onClick={() => setSidebarOpen(false)}
              >
                Cancel
              </button>
              <button className="save-btn">Save Scheme</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schemes;
