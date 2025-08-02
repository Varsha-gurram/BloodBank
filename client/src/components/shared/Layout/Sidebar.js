import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const sidebarStyles = {
  sidebar: {
    background: "#ffe4c2",
    minHeight: "calc(100vh - 60px)",
    width: 220,
    padding: "2rem 0.5rem",
    boxShadow: "2px 0 8px rgba(106,55,2,0.08)",
    position: "fixed",
    top: 68,
    left: 0,
    zIndex: 100,
    display: "flex",
    borderRadius: 5,
    flexDirection: "column",
    gap: "1rem",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1rem",
    color: "#6a3702",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "1rem",
    transition: "background 0.2s, color 0.2s",
    cursor: "pointer",
  },
  menuItemActive: {
    background: "#ffc285",
    color: "#6a3702",
  },
  menuItemHover: {
    background: "#ffd6b0",
    color: "#6a3702",
  },
  icon: {
    minWidth: 20,
    textAlign: "center",
    fontSize: "1.1rem",
  }
};

const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [hovered, setHovered] = React.useState(null);
  const getMenuItemStyle = (isActive, idx) => {
    if (isActive) return { ...sidebarStyles.menuItem, ...sidebarStyles.menuItemActive };
    if (hovered === idx) return { ...sidebarStyles.menuItem, ...sidebarStyles.menuItemHover };
    return sidebarStyles.menuItem;
  };
  const menuItems = [];
  let idx = 0;

  if (user?.role === "organisation") {
    menuItems.push(
      {
        to: "/",
        icon: <i className="fa-solid fa-cubes" style={sidebarStyles.icon}></i>,
        label: "Inventory",
        active: location.pathname === "/"
      },
      {
        to: "/donar",
        icon: <i className="fa-solid fa-hand-holding-medical" style={sidebarStyles.icon}></i>,
        label: "Donars",
        active: location.pathname === "/donar"
      },
      {
        to: "/hospital",
        icon: <i className="fa-solid fa-truck-medical" style={sidebarStyles.icon}></i>,
        label: "Hospitals",
        active: location.pathname === "/hospital"
      }
    );
  }

  if (user?.role === "admin") {
    menuItems.push(
      {
        to: "/donar-list",
        icon: <i className="fa-solid fa-hand-holding-medical" style={sidebarStyles.icon}></i>,
        label: "Donars",
        active: location.pathname === "/donar-list"
      },
      {
        to: "/hospital-list",
        icon: <i className="fa-solid fa-truck-medical" style={sidebarStyles.icon}></i>,
        label: "Hospitals",
        active: location.pathname === "/hospital-list"
      },
      {
        to: "/org-list",
        icon: <i className="fa-solid fa-hospital" style={sidebarStyles.icon}></i>,
        label: "Organisations",
        active: location.pathname === "/org-list"
      }
    );
  }

  if (user?.role === "donar" || user?.role === "hospital") {
    menuItems.push(
      {
        to: "/organisation",
        icon: <i className="fa-solid fa-building-ngo" style={sidebarStyles.icon}></i>,
        label: "Organisations",
        active: location.pathname === "/organisation"
      }
    );
  }

  if (user?.role === "hospital") {
    menuItems.push(
      {
        to: "/consumer",
        icon: <i className="fa-solid fa-users-between-lines" style={sidebarStyles.icon}></i>,
        label: "Consumer",
        active: location.pathname === "/consumer"
      }
    );
  }

  if (user?.role === "donar") {
    menuItems.push(
      {
        to: "/donation",
        icon: <i className="fa-solid fa-book-medical" style={sidebarStyles.icon}></i>,
        label: "Donations Log",
        active: location.pathname === "/donation"
      }
    );
  }

  return (
    <div style={sidebarStyles.sidebar}>
      <div style={sidebarStyles.menu}>
        {menuItems.map((item, i) => (
          <Link
            key={item.to}
            to={item.to}
            style={getMenuItemStyle(item.active, i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Sidebar;