import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateCategory from "./Components/Dashboard/CreateCategory/CreateCategory";
import ManageCategory from "./Components/Dashboard/ManageCategory/ManageCategory.jsx";
import ManageSubCategory from "./Components/Dashboard/ManageSubCategory/ManageSubCategory.jsx";
import Dashboard from "./Components/Dashboard/Dashboard";
import Home from "./Components/Home/Home";
import Login from "./Components/Home/Navbar/Login/Login";
import Register from "./Components/Home/Navbar/Register/Register";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";
import EditCategory from "./Components/Dashboard/EditCategory/EditCategory";
import CreateSubCategory from "./Components/Dashboard/CreateSubCategory/CreateSubCategory";
import EditSubCategory from "./Components/Dashboard/EditSubCategory/EditSubCategory";
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [tokenData, setTokenData] = useState({});
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      const newUser = { ...loggedInUser };
      newUser.name = user.name;
      newUser.email = user.email;
      newUser.role = user.role;
      newUser.avatar = user.avatar;
      setLoggedInUser(newUser);
      setTokenData(user.token);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        log: [loggedInUser, setLoggedInUser],
        token: [tokenData, setTokenData],
      }}
    >
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />

          <Route path="/createCategory" component={CreateCategory} />
          <Route path="/manageCategory" component={ManageCategory} />
          <Route path="/admin/editCategory/:slug" component={EditCategory} />
          <Route path="/createSubCategory" component={CreateSubCategory} />
          <Route path="/manageSubCategory" component={ManageSubCategory} />
          <Route
            path="/admin/editSubCategory/:slug"
            component={EditSubCategory}
          />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
