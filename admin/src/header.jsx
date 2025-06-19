//fotot
import React from "react";
import logo from "./img/logo.png";
import user from "./img/user.jpg";


//css
import "font-awesome/css/font-awesome.min.css";
import "./css/bootstrap.min.css"
import "./css/select2.min.css"
import "./css/bootstrap-datetimepicker.min.css"
import "./css/style.css"

function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <a href="index-2.html" className="logo">
          <img src={logo} width="35" height="35" alt="" />{" "}
          <span>Preclinic</span>
        </a>
      </div>
      <a id="toggle_btn" href="javascript:void(0);">
        <i className="fa fa-bars"></i>
      </a>
      <a id="mobile_btn" className="mobile_btn float-left" href="#sidebar">
        <i className="fa fa-bars"></i>
      </a>
      <ul className="nav user-menu float-right">
        <li className="nav-item dropdown d-none d-sm-block">
          <div className="dropdown-menu notifications">
            <div className="topnav-dropdown-header">
              <span>Notifications</span>
            </div>
            <div className="drop-scroll">
              <ul className="notification-list">
                <li className="notification-message">
                  <a href="activities.html">
                    <div className="media">
                      <span className="avatar">
                        <img
                          alt="John Doe"
                          src={user}
                          className="img-fluid"
                        />
                      </span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">John Doe</span> added new
                          task{" "}
                          <span className="noti-title">
                            Patient appointment booking
                          </span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">4 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="activities.html">
                    <div className="media">
                      <span className="avatar">V</span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Tarah Shropshire</span>{" "}
                          changed the task name{" "}
                          <span className="noti-title">
                            Appointment booking with payment gateway
                          </span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">6 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="activities.html">
                    <div className="media">
                      <span className="avatar">L</span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Misty Tison</span> added{" "}
                          <span className="noti-title">Domenic Houston</span> and{" "}
                          <span className="noti-title">Claire Mapes</span> to
                          project{" "}
                          <span className="noti-title">
                            Doctor available module
                          </span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">8 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="activities.html">
                    <div className="media">
                      <span className="avatar">G</span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Rolland Webber</span>{" "}
                          completed task{" "}
                          <span className="noti-title">
                            Patient and Doctor video conferencing
                          </span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">12 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="activities.html">
                    <div className="media">
                      <span className="avatar">V</span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Bernardo Galaviz</span> added
                          new task{" "}
                          <span className="noti-title">Private chat module</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">2 days ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              <a href="activities.html">View all Notifications</a>
            </div>
          </div>
        </li>

        <li className="nav-item dropdown has-arrow">
          <a
            href="#"
            className="dropdown-toggle nav-link user-link"
            data-bs-toggle="dropdown"
          >
            <span className="user-img">
              <img
                className="rounded-circle"
                src={user}
                width="40"
                alt="Admin"
              />
              <span className="status online"></span>
            </span>
            <span> Admin</span>
          </a>
          <div className="dropdown-menu">
            {/* <a className="dropdown-item" href="profile.html">
              My Profile
            </a>
            <a className="dropdown-item" href="edit-profile.html">
              Edit Profile
            </a>
            <a className="dropdown-item" href="settings.html">
              Settings
            </a> */}
            <a className="dropdown-item" href="login.html">
              Logout
            </a>
          </div>
        </li>
      </ul>
      <div className="dropdown mobile-user-menu float-right">
        <a
          href="#"
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa fa-ellipsis-v"></i>
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          {/* <a className="dropdown-item" href="profile.html">
            My Profile
          </a>
          <a className="dropdown-item" href="edit-profile.html">
            Edit Profile
          </a>
          <a className="dropdown-item" href="settings.html">
            Settings
          </a> */}
          <a className="dropdown-item" href="login.html">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
export default Header;
