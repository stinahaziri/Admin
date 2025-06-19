import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
// import "font-awesome/css/font-awesome.min.css";
// import "./css/bootstrap.min.css";
// import "./css/select2.min.css";
// import "./css/bootstrap-datetimepicker.min.css";
// import "./css/style.css";

function SideBar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">Main</li>

              <li className={isActive('/') ? 'active' : ''}>
                <Link to="/">
                  <i className="fa fa-dashboard"></i> <span>Dashboard</span>
                </Link>
              </li>

              <li className={isActive('/doctors') ? 'active' : ''}>
                <Link to="/doctors">
                  <i className="fa fa-user-md"></i> <span>Doctors</span>
                </Link>
              </li>

              {/* Shembuj të tjerë (të saktë): */}
              <li className={isActive('/appointments') ? 'active' : ''}>
                <Link to="/appointments">
                  <i className="fa fa-calendar"></i> <span>Appointments</span>
                </Link>
              </li>

          

              <li className={isActive('/departments') ? 'active' : ''}>
                <Link to="/department">
                  <i className="fa fa-hospital-o"></i> <span>Departments</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
    

      {/* Outlet për të shfaqur faqet */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default SideBar;
