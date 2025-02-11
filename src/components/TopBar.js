import { Link } from "react-router-dom";

function TopBar() {
  return (
    <nav
      className="navbar  col-lg-12 col-12 p-0 fixed-top d-flex flex-row"
      style={{ boxShadow: " 0px 9px 7px 0px #04775A59" }}
    >
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a className="navbar-brand brand-logo mr-5" href="index.html">
          <img
            src="images/logicgyan.png"
            className="mr-2 w-[100%] h-[100%] object-cover"
            alt="logo"
          />
        </a>
        <a className="navbar-brand brand-logo-mini" href="index.html">
          <img
            src={`${process.env.PUBLIC_URL}images/logicgyan.png`}
            alt="logo"
            className=" w-[100%] h-[100%] object-cover"
          />
        </a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button
          className="navbar-toggler  navbar-toggler align-self-center"
          style={{ boxShadow: "none" }}
          type="button"
          data-toggle="minimize"
        >
          <span className="icon-menu"></span>
        </button>
        <ul className="navbar-nav mr-lg-2">
          <li className="  d-none d-lg-block px-3 ">
            <div className=" top-search-input px-2 rounded-full flex items-center">
              <i className="icon-search"></i>
              <input
                type="search "
                placeholder="Search Now"
                className="px-2 bg-none border-none outline-none  w-[100%]"
              />
            </div>
          </li>
        </ul>

        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item dropdown">
            <a
              className="nav-link count-indicator dropdown-toggle"
              id="notificationDropdown"
              href="#"
              data-toggle="dropdown"
            >
              <i className="icon-bell mx-0"></i>
              <span className="count"></span>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
              aria-labelledby="notificationDropdown"
            >
              <p className="mb-0 font-weight-normal float-left dropdown-header">
                Notifications
              </p>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-success">
                    <i className="ti-info-alt mx-0"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-normal">
                    Application Error
                  </h6>
                  <p className="font-weight-light small-text mb-0 text-muted">
                    Just now
                  </p>
                </div>
              </a>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-warning">
                    <i className="ti-settings mx-0"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-normal">
                    Settings
                  </h6>
                  <p className="font-weight-light small-text mb-0 text-muted">
                    Private message
                  </p>
                </div>
              </a>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-info">
                    <i className="ti-user mx-0"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-normal">
                    New user registration
                  </h6>
                  <p className="font-weight-light small-text mb-0 text-muted">
                    2 days ago
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li className="nav-item nav-profile dropdown">
            <Link to="/profile">
              <img src="images/faces/face28.jpg" alt="profile" />
            </Link>
          </li>
          <li className="nav-item nav-settings d-none d-lg-flex">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="icon-ellipsis"></i>
            </a>
          </li>
        </ul>

        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          style={{ boxShadow: "none" }}
          type="button"
          data-toggle="offcanvas"
        >
          <span className="icon-menu"></span>
        </button>
      </div>
    </nav>
  );
}

export default TopBar;
