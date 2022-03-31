/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaStream } from "react-icons/fa";
import { UserContext } from "../../../App";
const Navbar = () => {
  const { log } = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = log;
  console.log(loggedInUser);

  const handleLogOut = () => {
    const newUserInfo = { ...loggedInUser };
    newUserInfo.name = "";
    newUserInfo.email = "";
    newUserInfo.role = "";
    newUserInfo.avatar = "";
    setLoggedInUser(newUserInfo);
    localStorage.removeItem("userInfo");
  };
  return (
    <div className="container">
      <nav class="navbar navbar-expand-lg navbar-light ">
        <div class="container-fluid pe-lg-2 p-0">
          {" "}
          <Link class="navbar-brand fw-bold fs-3" to="/">
            OGANI
          </Link>{" "}
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* <i class="fas fa-stream navbar-toggler-icon"></i> */}
            <FaStream class="navbar-toggler-icon" />
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                {" "}
                <Link
                  class="nav-link pe-3 me-4 fw-bold active"
                  aria-current="page"
                  to="/"
                >
                  HOME
                </Link>{" "}
              </li>
              <li class="nav-item">
                {" "}
                <Link class="nav-link pe-3 me-4 fw-bold" to="/">
                  SHOP
                </Link>{" "}
              </li>
              <li class="nav-item">
                {" "}
                <Link class="nav-link pe-3 me-4 fw-bold" to="/">
                  PAGES
                </Link>{" "}
              </li>
              {JSON.parse(localStorage.getItem("userInfo")) ? (
                <li class="nav-item">
                  {" "}
                  <Link class="nav-link pe-3 me-4 fw-bold" to="/dashboard">
                    Dashboard
                  </Link>{" "}
                </li>
              ) : (
                ""
              )}
            </ul>
            <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <ul class="navbar-nav icons ms-auto mb-2 mb-lg-0">
              <li class=" nav-item pe-3">
                {" "}
                <Link href="" class="fas fa-heart fa_icon">
                  {" "}
                  <span class="num rounded-circle">1</span>{" "}
                </Link>{" "}
              </li>
              <li class=" nav-item pe-3">
                {" "}
                <Link href="" class="fas fa-shopping-bag fa_icon">
                  {" "}
                  <span class="num rounded-circle">3</span>{" "}
                </Link>{" "}
              </li>
              {JSON.parse(localStorage.getItem("userInfo")) ? (
                <li class="nav-item">
                  {" "}
                  <li class=" nav-item">
                    <div class="dropdown">
                      <img
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        alt="Avatar"
                        id="dropdownMenuButton1"
                        class="avatar dropdown-toggle"
                        data-bs-toggle="dropdown"
                        data-bs-display="static"
                        aria-expanded="false"
                      />
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <Link class="dropdown-item" onClick={handleLogOut}>
                            Log Out
                          </Link>
                        </li>
                        <li>
                          <Link class="dropdown-item" href="#">
                            Another action
                          </Link>
                        </li>
                        <li>
                          <Link class="dropdown-item" href="#">
                            Something else here
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>{" "}
                </li>
              ) : (
                <li class="nav-item">
                  {" "}
                  <Link class="nav-link pe-3 me-4 fw-bold" to="/login">
                    Login
                  </Link>{" "}
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
