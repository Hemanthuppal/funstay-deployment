import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaCalendarCheck, FaUmbrellaBeach, FaWalking, FaFileInvoiceDollar, FaTachometerAlt, FaBell, FaEnvelope, FaCaretDown,FaRegAddressBook, FaCalendarAlt, FaBullhorn, FaUsersCog, FaHome, FaClipboardList, FaChartLine, FaUserFriends, FaPeopleCarry, FaHSquare          } from "react-icons/fa";
import { IoHomeOutline, IoMenu } from "react-icons/io5";
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onToggleSidebar }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // State for toggle menu
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    onToggleSidebar(!collapsed);
  };

  const handleNavItemClick = () => {
    if (window.innerWidth <= 768) {
      setCollapsed(true);
    }
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    console.log('Logged out');
    navigate('/');
  };

  return (
    <>
      <div className="admin-container">
        <div className="admin-header">
          <div className="admin-header-left">
            <div
              className={`admin-sidebar-toggle ${collapsed ? 'collapsed' : ''}`}
              onClick={toggleSidebar}
            >
              <IoMenu className="toggle-icon" />
            </div> &nbsp;&nbsp;
            <img src={'https://primary0101211.s3.ap-south-1.amazonaws.com/v3/assets/images/Logo.png'} alt="Logo" className="admin-company-logo" />
          </div>
          <h2 className="text-center" style={{ color: 'white' }}>Admin</h2>

          <div className="admin-header-right">
            {/* Add Leads Button */}
           

            <div className="admin-header-icons">
              <div className="admin-nav-icon-container">
                <FaBell className="admin-nav-icon" />
                <span className="admin-nav-badge">12</span>
              </div>
              <div className="admin-nav-icon-container">
                <FaEnvelope className="admin-nav-icon" />
                <span className="admin-nav-badge">24</span>
              </div>

              <div className="admin-nav-icon-container" onClick={handleProfileClick}>
                <div className="admin-nav-profile">
                  <img
                    src="https://i.pravatar.cc/40?img=4"
                    alt="Profile"
                    className="admin-nav-profile-img"
                  />
                  <FaCaretDown className="admin-nav-caret-icon" />
                </div>
                {showDropdown && (
                  <div className="admin-nav-profile-dropdown">
                    <div className="admin-nav-profile-header">
                      <strong>Alex Johnson</strong>
                    </div>
                    <div className="admin-nav-profile-item">Your Profile</div>
                    <div className="admin-nav-profile-item">Settings</div>
                    <div className="admin-nav-profile-item">Help Center</div>
                    <div className="admin-nav-profile-item" onClick={handleLogout}>Sign Out</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
          <div className="admin-position-sticky">
            <ul className="nav flex-column">
              <li className="admin-nav-item">
                <Link className="nav-link" to="/m-dashboard" onClick={handleNavItemClick}>
                  <FaHome className="admin-nav-icon" />
                  {!collapsed && <span className="link_text">Dashboard</span>}
                </Link>
              </li>

              <li className="admin-nav-item">
                <Link className="nav-link" to="/a-view-lead" onClick={handleNavItemClick}>
                  <FaClipboardList   className="admin-nav-icon" />
                  {!collapsed && <span className="link_text">All Leads</span>}
                </Link>
              </li>

              <li className="admin-nav-item">
                <Link className="nav-link" to="/a-potential-leads" onClick={handleNavItemClick}>
                  <FaChartLine    className="admin-nav-icon" />
                  {!collapsed && <span className="link_text">My Teams Opportunities</span>}
                </Link>
              </li>

              <li className="admin-nav-item">
                <Link className="nav-link" to="/a-customers" onClick={handleNavItemClick}>
                  <FaUserFriends    className="admin-nav-icon" />
                  {!collapsed && <span className="link_text">My Teams customer</span>}
                </Link>
              </li>
              <li className="admin-nav-item">
                <Link className="nav-link" to="/a-allteams" onClick={handleNavItemClick}>
                  <FaPeopleCarry className="admin-nav-icon" />
                  {!collapsed && <span className="link_text">My Teams </span>}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
