import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {FaUsers,FaCalendarAlt,FaUserPlus,FaTachometerAlt, FaCalendarCheck,FaUmbrellaBeach,FaWalking,FaFileInvoiceDollar,} from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import "./Sidebar.css";

import logo from "./../../Images/pos.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';


const AdminSidebar = ({ onToggleSidebar }) => {

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
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-header-left">

          <div
            className={`admin-sidebar-toggle ${collapsed ? 'collapsed' : ''}`}
            onClick={toggleSidebar}
          >
            <IoHomeOutline className="toggle-icon" />
          </div> &nbsp;&nbsp;
          <img src={logo} alt="Logo" className="admin-company-logo" />
        </div>
        <div className="admin-header-right">
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

      <div className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="admin-position-sticky">
          <ul className="nav flex-column">

            <h2 className="text-center">Admin</h2>

            <li className={`admin-nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              <Link className="nav-link" to="/dashboard" onClick={handleNavItemClick}>
                <FaTachometerAlt className="admin-nav-icon" />
                {!collapsed && <span className="link_text">Dashboard</span>}
              </Link>
            </li>

           
            


            <li className={`admin-nav-item ${location.pathname === '/category' ? 'active' : ''}`}>
              <Link className="nav-link" to="/category" onClick={handleNavItemClick}>
                <FaUsers className="admin-nav-icon" />
                {!collapsed && <span className="link_text">Category</span>}
              </Link>
            </li>

            <li className={`admin-nav-item ${location.pathname === '/productlist' ? 'active' : ''}`}>
              <Link className="nav-link" to="/productlist" onClick={handleNavItemClick}>
                <FaCalendarCheck className="admin-nav-icon" />
                {!collapsed && <span className="link_text">Product List</span>}
              </Link>
            </li>

            <li className={`admin-nav-item ${location.pathname === '/adminpos' ? 'active' : ''}`}>
              <Link className="nav-link" to="/adminpos" onClick={handleNavItemClick}>
                <FaCalendarAlt className="admin-nav-icon" />
                {!collapsed && <span className="link_text">POS</span>}
              </Link>
            </li>

            <li className={`admin-nav-item ${location.pathname === '/adminorder' ? 'active' : ''}`}>
              <Link className="nav-link" to="/adminorder" onClick={handleNavItemClick}>
                <FaUmbrellaBeach className="admin-nav-icon" />
                {!collapsed && <span className="link_text">Order List</span>}
              </Link>
            </li>

            <li className={`admin-nav-item ${location.pathname === '/tax' ? 'active' : ''}`}>
              <Link className="nav-link" to="/tax" onClick={handleNavItemClick}>
                <FaWalking className="admin-nav-icon" />
                {!collapsed && <span className="link_text">Tax(SGST-CGST)</span>}
              </Link>
            </li>


            <li className={`admin-nav-item ${location.pathname === '/registration' ? 'active' : ''}`}>
              <Link className="nav-link" to="/registration" onClick={handleNavItemClick}>
                <FaFileInvoiceDollar className="admin-nav-icon" />
                {!collapsed && <span className="link_text">Registration</span>}
              </Link>
            </li>

            <li className={`admin-nav-item ${location.pathname === '/adminChangepassword' ? 'active' : ''}`}>
              <Link className="nav-link" to="/adminChangepassword" onClick={handleNavItemClick}>
                <FaUserPlus className="admin-nav-icon" />
                {!collapsed && <span className="link_text">ChangePassword</span>}
              </Link>
            </li>
                      
            <li className={`admin-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link className="nav-link" to="/" onClick={handleNavItemClick}>
                <FaFileInvoiceDollar className="admin-nav-icon" />
                {!collapsed && <span className="link_text">Logout</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </>
  );
};

export default AdminSidebar;
