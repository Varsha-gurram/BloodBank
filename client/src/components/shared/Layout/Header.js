import React from 'react'
import { MdOutlineBloodtype } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
const headerStyles = {
  navbar: {
    backgroundColor: "#ffe4c2",
    padding: "0.75rem 0",
    boxShadow: "0 2px 8px rgba(106,55,2,0.08)",
  },
  brand: {
    color: "#6a3702",
    fontWeight: 700,
    fontSize: "1.6rem",
    letterSpacing: 1,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  gold: {
    color: "#ffc285",
    fontWeight: 700,
    letterSpacing: 1,
  },
  navLink: {
    color: "#6a3702",
    fontWeight: 500,
    fontSize: "1rem",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "0.5rem 1rem",
    borderRadius: 6,
    transition: "background 0.2s, color 0.2s",
  },
  navLinkActive: {
    backgroundColor: "#ffc285",
    color: "#6a3702",
  },
  badge: {
    backgroundColor: "#ffc285",
    color: "#6a3702",
    marginLeft: 8,
    fontWeight: 600,
    borderRadius: 6,
    padding: "0.2rem 0.7rem",
    fontSize: "0.85rem",
  },
  btn: {
    backgroundColor: "#ffc285",
    color: "#6a3702",
    border: "none",
    padding: "0.5rem 1.2rem",
    borderRadius: 6,
    fontWeight: 600,
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s",
  },
  btnHover: {
    backgroundColor: "#ffd6b0",
    color: "#6a3702",
  }
};

const Header = () => {
  const { user } = useSelector(state => state.auth);
  const location = useLocation();
  const [btnHover, setBtnHover] = React.useState(false);

  const handleLogout = () => {
    localStorage.clear();
    alert('Logout Successful !')
    window.location.reload();
  }

  return (
    <>
      <nav style={headerStyles.navbar}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div style={headerStyles.brand}>
            <MdOutlineBloodtype color='white' size={28} />
            LifeStream
          </div>
          <ul className='navbar-nav flex-row align-items-center mb-0'>
            <li className="nav-item mx-3">
              <span style={headerStyles.navLink}>
                <FaUserAlt />
                Welcome <span style={headerStyles.gold}>
                  {user?.name || user?.hospitalName || user?.organisationName}
                </span>
                <span style={headerStyles.badge}>{user?.role}</span>
              </span>
            </li>
            {(location.pathname === '/' || location.pathname === '/donar' || location.pathname === '/hospital') ? (
              <li className='nav-item mx-3'>
                <Link
                  to='/analytics'
                  style={headerStyles.navLink}
                  className='nav-link'
                >
                  Analytics
                </Link>
              </li>
            ) : (
              <li className='nav-item mx-3'>
                <Link
                  to='/'
                  style={headerStyles.navLink}
                  className='nav-link'
                >
                  Home
                </Link>
              </li>
            )}
            <li className="nav-item mx-3">
              <button
                style={btnHover ? { ...headerStyles.btn, ...headerStyles.btnHover } : headerStyles.btn}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                onClick={handleLogout}
              >
                <HiOutlineLogout /> Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
export default Header