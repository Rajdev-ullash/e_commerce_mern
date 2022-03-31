import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Register/Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../../App";
const Login = () => {
  const { log } = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = log;
  let history = useHistory();

  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("userInfo"))) {
  //     history.push("/");
  //   }
  // }, []);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [data, setData] = useState({});

  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn("Please fill all this field", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    const url = "http://localhost:5000/api/user/login";

    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.data) {
            setData(data.data);
            toast.success(data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            // setUser(data.data);
            localStorage.setItem("userInfo", JSON.stringify(data.data));
            const newUser = { ...loggedInUser };
            newUser.name = data.data.name;
            newUser.email = data.data.email;
            newUser.role = data.data.role;
            newUser.avatar = data.data.avatar;
            setLoggedInUser(newUser);
            console.log(newUser);
            setTimeout(() => {
              history.replace(from);
            }, 6000);
          }
          if (data.error_message) {
            toast.error(data.error_message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          if (data.error) {
            toast.error(data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
    } catch (error) {
      toast.error(error.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div class="main">
      <section class="signup">
        <div class="container w-50 d-flex justify-content-center mt-5">
          <div class="signup-content mt-5">
            <form id="signup-form" class="signup-form">
              <h2 class="form-title">Login</h2>

              <div class="form-group">
                <input
                  type="email"
                  class="form-input form-control"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="form-group">
                <input
                  type={passwordShown ? "text" : "password"}
                  class="form-input form-control"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  toggle="#password"
                  class="zmdi zmdi-eye field-icon toggle-password"
                >
                  <i
                    onClick={togglePassword}
                    class={passwordShown ? "fas fa-eye-slash" : "fas fa-eye"}
                  ></i>
                </span>
              </div>
              <div class="form-group">
                <input
                  type="submit"
                  name="submit"
                  id="submit"
                  class="form-submit"
                  value="Login"
                  onClick={(e) => handleLogin(e)}
                />
              </div>
            </form>
            <p class="loginhere">
              New User ?{" "}
              <Link to="/register" class="loginhere-link">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Login;
