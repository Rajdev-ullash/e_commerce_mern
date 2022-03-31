//import useState hook to create menu collapse state
import React, { useContext, useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SubMenu,
} from "react-pro-sidebar";

//import icons from react icons

import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { RiPencilLine, RiAdminFill } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineManageAccounts } from "react-icons/md";

import { useHistory } from "react-router-dom";
//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";

import "./Sidebar.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";

const Sidebar = () => {
  const { log } = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = log;
  console.log(loggedInUser);
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  let history = useHistory();

  const [actives, setActive] = useState("");
  // const buttonHandler = () => {
  //   setActive(actives);
  // };
  const homeButton = () => {
    setActive("home");
    // history.push("/dashboard");
  };
  const createBlogButton = () => {
    setActive("cblog");
    // history.push("/createBlog");
  };

  const createCategoryButton = () => {
    setActive("category");
    history.push("/createCategory");
  };
  const manageCategoryButton = () => {
    setActive("manageCategory");
    history.push("/manageCategory");
  };
  const createSubCategoryButton = () => {
    setActive("subCategory");
    history.push("/createSubCategory");
  };
  const manageSubCategoryButton = () => {
    setActive("manageSubCategory");
    history.push("/manageSubCategory");
  };
  // manageSubCategory
  return (
    <div id="header">
      {/* collapsed props to change menu size using menucollapse state */}
      <ProSidebar collapsed={menuCollapse}>
        <SidebarHeader>
          <div className="logotext">
            {/* small and big change using menucollapse state */}
            <p>{menuCollapse ? "User" : "User"}</p>
          </div>
          <div className="closemenu" onClick={menuIconClick}>
            {/* changing menu collapse icon on click */}
            {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem
              onClick={homeButton}
              className={actives === "home" ? "active" : "dactive"}
              icon={<FiHome />}
            >
              Home
            </MenuItem>
            <MenuItem
              onClick={createBlogButton}
              className={actives === "cblog" ? "active" : "dactive"}
              icon={<RiPencilLine />}
            >
              Create Blog
            </MenuItem>

            <MenuItem icon={<MdOutlineManageAccounts />}>Manage Blog</MenuItem>
            <MenuItem icon={<CgProfile />}>
              Profile <Link to="/user/profile" />
            </MenuItem>
            <MenuItem icon={<BiCog />}>Settings</MenuItem>
            {loggedInUser.role == "admin" && (
              <SubMenu title="Admin" icon={<RiAdminFill />}>
                <MenuItem icon={<FiHome />}>Home</MenuItem>
                <MenuItem icon={<RiPencilLine />}>All Blogs</MenuItem>
                <MenuItem
                  onClick={createCategoryButton}
                  className={actives === "category" ? "active" : "dactive"}
                  icon={<RiPencilLine />}
                >
                  Create Category
                </MenuItem>
                <MenuItem
                  onClick={manageCategoryButton}
                  className={
                    actives === "manageCategory" ? "active" : "dactive"
                  }
                  icon={<RiPencilLine />}
                >
                  Manage Category
                </MenuItem>
                <MenuItem
                  onClick={createSubCategoryButton}
                  className={actives === "subCategory" ? "active" : "dactive"}
                  icon={<RiPencilLine />}
                >
                  Create SubCategory
                </MenuItem>
                <MenuItem
                  onClick={manageSubCategoryButton}
                  className={
                    actives === "manageSubCategory" ? "active" : "dactive"
                  }
                  icon={<RiPencilLine />}
                >
                  Manage SubCategory
                </MenuItem>
              </SubMenu>
            )}
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
