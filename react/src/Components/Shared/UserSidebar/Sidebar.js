import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {FaUsers,FaSignOutAlt,FaCalendarAlt,FaUserPlus,FaTachometerAlt, FaCalendarCheck,FaUmbrellaBeach,FaWalking,FaFileInvoiceDollar,FaCalendarWeek} from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import "./Sidebar.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

import logo from "./../../Images/pos.png";


const UserSidebar = ({ onToggleSidebar }) => {
  
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();


  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    onToggleSidebar(!collapsed);
  };

  const handleNavItemClick = () => {
    if (window.innerWidth <= 768) {
      setCollapsed(true);
    }
  };
  const handleLogout = () => {

    console.log('Logged out');
    navigate('/');
};
const navigate = useNavigate();
  return (
    <>
      <div className="user-header">
        <div className="user-header-left">

          <div
            className={`user-sidebar-toggle ${collapsed ? 'collapsed' : ''}`}
            onClick={toggleSidebar}
          >
            <IoHomeOutline className="toggle-icon" />
          </div> &nbsp;&nbsp;
          <img src={logo} alt="Logo" className="user-company-logo" />
        </div>
        <div className="user-header-right">
          <div className="logout-button">
          <FontAwesomeIcon 
                icon={faSignOutAlt} 
                className="logout-icon" 
                onClick={handleLogout} 
                style={{ cursor: 'pointer', color: 'red', fontSize: '24px' }} 
            />
          </div>
        </div>
      </div>

      <div className={`user-sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="user-position-sticky">
          <ul className="nav flex-column">

            <h2 className="text-center">User</h2>

           
            <li className={`user-nav-item ${location.pathname === '/userpos' ? 'active' : ''}`}>
              <Link className="nav-link" to="/userpos" onClick={handleNavItemClick}>
                <FaCalendarCheck className="user-nav-icon" />
                {!collapsed && <span className="link_text">POS</span>}
              </Link>
            </li>
            <li className={`user-nav-item ${location.pathname === '/userorderlist' ? 'active' : ''}`}>
              <Link className="nav-link" to="/userorderlist" onClick={handleNavItemClick}>
                <FaCalendarWeek className="user-nav-icon" />
                {!collapsed && <span className="link_text">Order List</span>}
              </Link>
            </li>

            <li className={`user-nav-item ${location.pathname === '/userchangepassword' ? 'active' : ''}`}>
              <Link className="nav-link" to="/userchangepassword" onClick={handleNavItemClick}>
                <FaCalendarAlt className="user-nav-icon" />
                {!collapsed && <span className="link_text">Change Password</span>}
              </Link>
            </li>

            
            <li className={`user-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link className="nav-link" to="/" onClick={handleNavItemClick}>
                <FaSignOutAlt className="user-nav-icon" />
                {!collapsed && <span className="link_text">Logout</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
