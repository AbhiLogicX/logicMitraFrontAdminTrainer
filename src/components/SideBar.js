import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <nav className="sidebar sidebar-offcanvas text-white" id="sidebar">
      <ul className="nav ">
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              `nav-link ${isActive ? "active1" : ""}`
            }
            style={{ color: "white" }}
            to="/"
          >
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title menu-title1 ">Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              `nav-link ${isActive ? "active1" : ""}`
            }
            style={{ color: "white" }}
            to="/students"
          >
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title menu-title1">Students</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              `nav-link ${isActive ? "active1" : ""}`
            }
            style={{ color: "white" }}
            to="/trainers"
          >
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title menu-title1">Trainers</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              `nav-link ${isActive ? "active1" : ""}`
            }
            style={{ color: "white" }}
            to="/courses"
          >
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title menu-title1">Courses</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              `nav-link ${isActive ? "active1" : ""}`
            }
            style={{ color: "white" }}
            to="/categories"
          >
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title menu-title1">Categories</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              `nav-link ${isActive ? "active1" : ""}`
            }
            style={{ color: "white" }}
            to="/home-slider"
          >
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title menu-title1">Home Slider</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              `nav-link ${isActive ? "active1" : ""}`
            }
            style={{ color: "white" }}
            to="/enrollment"
          >
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title menu-title1">Enrollment</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              `nav-link ${isActive ? "active1" : ""}`
            }
            style={{ color: "white" }}
            to="/batches"
          >
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title menu-title1">Batches</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SideBar;
