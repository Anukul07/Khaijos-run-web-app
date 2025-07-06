import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./../../styles/navigation.css";
import logo from "./../../assets/Landing/Logo.png";
import profilePlaceHolder from "./../../assets/Navigation/profile.jpg";
import menuIcon from "./../../assets/Navigation/menu-icon.svg";
import bellIcon from "./../../assets/Navigation/bell-icon.svg";
import cartIcon from "./../../assets/Navigation/cart.svg";
import chocolateIcon from "./../../assets/Navigation/chocolate-icon.svg";
import statsIcon from "../../assets/Navigation/wpf_statistics.svg";
import purchaseHistoryIcon from "../../assets/Navigation/raphael_history.svg";
import sessionIcon from "../../assets/Navigation/carbon_mobile-session.svg";
import profileIcon from "../../assets/Navigation/iconamoon_profile-bold.svg";
import logoutIcon from "../../assets/Navigation/tabler_logout.svg";

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const profileImageSrc = user.photo
    ? `/profiles/${user.photo}`
    : profilePlaceHolder;

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowMenu(false);
    setShowProfileDropdown(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowNotifications(false);
    setShowProfileDropdown(false);
  };

  const toggleProfile = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowNotifications(false);
    setShowMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/authentication");
  };

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-left">
          <div className="nav-logo-border">
            <img src={logo} alt="Khaijos Logo" className="nav-logo" />
          </div>
        </div>

        <div className="nav-center">
          <div className="nav-links hide-center-on-mobile">
            <Link
              to="/homepage"
              className={isActive("/homepage") ? "active" : ""}
            >
              RUN WITH US
            </Link>
            <Link to="/shop" className={isActive("/shop") ? "active" : ""}>
              SHOP
            </Link>
            <Link
              to="/trainer"
              className={isActive("/trainer") ? "active" : ""}
            >
              TRAINER
            </Link>
          </div>
        </div>

        <div className="nav-right">
          <div className="nav-icon gradient-hover hide-on-mobile">
            <img src={cartIcon} alt="Cart" className="icon-img" />
          </div>
          <div
            className={`nav-icon gradient-hover hide-on-mobile ${
              showNotifications ? "active-icon" : ""
            }`}
            onClick={toggleNotifications}
          >
            <img src={bellIcon} alt="Notifications" className="icon-img" />
          </div>
          <div
            className={`nav-icon gradient-hover hide-on-mobile ${
              showMenu ? "active-icon" : ""
            }`}
            onClick={toggleMenu}
          >
            <img src={menuIcon} alt="Menu" className="icon-img" />
          </div>
          <div
            className="profile-border hide-on-mobile"
            onClick={toggleProfile}
          >
            <img src={profileImageSrc} alt="Profile" className="profile-img" />
          </div>

          <div className="nav-icon drawer-toggle" onClick={toggleDrawer}>
            <img src={chocolateIcon} alt="Menu" className="icon-img" />
          </div>
        </div>

        {/* === DROPDOWNS === */}
        {showNotifications && (
          <div className="notification-dropdown">
            <div className="notification-item">🏃‍♂️ You joined a group run.</div>
            <div className="notification-item">
              🛍️ New gear drop in the shop!
            </div>
            <div className="notification-item">
              📣 A trainer commented on your run.
            </div>
            <div className="notification-actions">
              <button className="clear-btn">Clear All</button>
              <button className="view-btn">View All</button>
            </div>
          </div>
        )}

        {showMenu && (
          <div className="menu-dropdown">
            <Link to="/stats" className="menu-item">
              <div className="menu-item-content">
                My Stats
                <img src={statsIcon} alt="statistics-icon" />
              </div>
            </Link>

            <Link to="/sessions" className="menu-item">
              <div className="menu-item-content">
                Sessions
                <img src={sessionIcon} alt="sessions-icon" />
              </div>
            </Link>

            <Link to="/purchases" className="menu-item">
              <div className="menu-item-content">
                Purchase History
                <img src={purchaseHistoryIcon} alt="purchase-history-icon" />
              </div>
            </Link>
          </div>
        )}

        {showProfileDropdown && (
          <div className="profile-dropdown">
            <Link to="/profile" className="profile-item">
              <div className="profile-item-content">
                Profile <img src={profileIcon} alt="profile icon" />
              </div>
            </Link>
            <button className="profile-item logout-btn" onClick={handleLogout}>
              <div className="profile-item-content">
                Logout <img src={logoutIcon} alt="logout icon" />
              </div>
            </button>
          </div>
        )}
      </nav>

      {/* === SIDEBAR DRAWER === */}
      {isDrawerOpen && (
        <div className="drawer-overlay" onClick={toggleDrawer}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <button className="close-btn" onClick={toggleDrawer}>
                ✕
              </button>
            </div>

            {/* nav-center links inside drawer for <768px */}
            <div className="drawer-section show-only-on-mobile">
              <div
                className={`drawer-item ${
                  isActive("/homepage") ? "active-drawer-item" : ""
                }`}
                onClick={() => {
                  toggleDrawer();
                  navigate("/homepage");
                }}
              >
                🏃 RUN WITH US
              </div>

              <div
                className={`drawer-item ${
                  isActive("/shop") ? "active-drawer-item" : ""
                }`}
                onClick={() => {
                  toggleDrawer();
                  navigate("/shop");
                }}
              >
                🛍️ SHOP
              </div>

              <div
                className={`drawer-item ${
                  isActive("/trainer") ? "active-drawer-item" : ""
                }`}
                onClick={() => {
                  toggleDrawer();
                  navigate("/trainer");
                }}
              >
                🧑‍🏫 TRAINER
              </div>
            </div>

            <div
              className="drawer-item"
              onClick={() => {
                toggleDrawer();
                navigate("/cart");
              }}
            >
              🛒 Cart
            </div>
            <div
              className="drawer-item"
              onClick={() => {
                toggleDrawer();
                navigate("/notification");
              }}
            >
              🔔 Notifications
            </div>

            <details className="drawer-collapsible">
              <summary>📋 Menu</summary>
              <div
                className="drawer-subitem"
                onClick={() => navigate("/stats")}
              >
                My Stats
              </div>
              <div
                className="drawer-subitem"
                onClick={() => navigate("/sessions")}
              >
                Sessions
              </div>
              <div
                className="drawer-subitem"
                onClick={() => navigate("/purchases")}
              >
                Purchase History
              </div>
            </details>

            <details className="drawer-collapsible">
              <summary>👤 Account</summary>
              <div
                className="drawer-subitem"
                onClick={() => navigate("/profile")}
              >
                Profile
              </div>
              <div className="drawer-subitem logout-btn" onClick={handleLogout}>
                Logout
              </div>
            </details>
          </div>
        </div>
      )}
    </>
  );
}
