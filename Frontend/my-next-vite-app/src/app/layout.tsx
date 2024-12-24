"use client";

import React, { useState } from "react";
import "./global.css";
import "./all.css";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleNotificationClick = () => {
    // Redirect to notifications page with user ID (replace 'userId' dynamically)
    const userId = "12345"; // Replace with actual user ID from context/auth
    router.push(`/notifications/${userId}`);
  };

  return (
    <html lang="en">
      <head></head>
      <body>
        <div className="header">
          {/* Menu Icon (For Sidebar) */}
          <i className="fa-solid fa-bars menu-icon" onClick={toggleSidebar}></i>

          {/* Search Bar */}
          <div className="search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" className="search-input" placeholder="Search..." />
          </div>

          {/* Bell Icon */}
          <i
            className="fa-solid fa-bell bell-icon"
            onClick={handleNotificationClick}
            style={{ cursor: "pointer" }}
          ></i>

          {/* List Icon (Dropdown) */}
          <i className="fa-solid fa-list menu-icon" onClick={toggleDropdown}></i>

          {/* Dropdown Menu */}
          {dropdownVisible && (
            <div className="dropdown">
              <ul>
                <li>
                  <a>Account</a>
                </li>
                <li>
                  <a>Login</a>
                </li>
                <li>
                  <a>SignUp</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
                <li>
                  <a>Delete Account</a>
                </li>
              </ul>
            </div>
          )}

          {/* Sidebar */}
          <div className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
            <ul>
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Courses</a>
              </li>
              <li>
                <a>Modules</a>
              </li>
              <li>
                <a
                  onClick={() => {
                    const userId = "12345"; // Replace with actual user ID
                    router.push(`/notifications/${userId}`);
                  }}
                >
                  Notification
                </a>
              </li>
              <li>
                <a>Logs</a>
              </li>
              <li>
                <a>Feedback</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="content">{children}</div>
      </body>
    </html>
  );
}
