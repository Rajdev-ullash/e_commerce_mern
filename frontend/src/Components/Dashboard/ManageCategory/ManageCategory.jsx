import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./ManageCategory.css";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { UserContext } from "../../../App";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ManageCategory = () => {
  const [manageData, setManageData] = useState([]);
  const { token } = useContext(UserContext);
  const [tokenData, setTokenData] = token;
  console.log(tokenData);
  const [loader, setLoader] = useState(false);

  const [keywords, setKeywords] = useState("");

  const deleteCategory = (slug) => {
    fetch(`http://localhost:5000/api/category/deleteCategory/${slug}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenData}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          toast.success(data.message, {
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
  };

  useEffect(() => {
    setLoader(true);
    fetch("http://localhost:5000/api/category/allCategory", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenData}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setManageData(data.result);
        setLoader(false);
        console.log(data.result);
      });
  }, []);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeywords(e.target.value.toLowerCase());
  };

  const searched = (keywords) => (manage) =>
    manage.name.toLowerCase().includes(keywords);

  return (
    <div className="overflow-hidden">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div class="col-md-offset-1 col-md-10">
          <div class="panel">
            <div class="panel-heading">
              <div class="row">
                <div class="col-sm-12 col-xs-12">
                  <form class="form-horizontal pull-right">
                    <div class="form-group">
                      <label>Show : </label>
                      <select class="form-control">
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                      </select>
                    </div>
                  </form>
                  <div class="form form_search mt-5">
                    <input
                      type="search"
                      name="name"
                      autocomplete="off"
                      value={keywords}
                      onChange={handleSearchChange}
                      placeholder="Search Category"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="panel-body table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Action</th>
                    <th scope="col">Category ID</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Category Slug</th>
                    <th scope="col">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {manageData?.filter(searched(keywords)).map((manage) => (
                    <tr>
                      {/* <th scope="row"></th> */}
                      <td>
                        <ul class="action-list">
                          <li>
                            <Link
                              to={`/admin/editCategory/${manage.slug}`}
                              class="btn btn-primary link_custom"
                            >
                              <i class="fa fa-pencil-alt"></i>
                            </Link>
                          </li>
                          <li>
                            <Link class="btn btn-danger link_custom">
                              <i
                                onClick={() => deleteCategory(manage.slug)}
                                class="fa fa-times"
                              ></i>
                            </Link>
                          </li>
                        </ul>
                      </td>
                      <td>{manage?._id}</td>
                      <td>{manage?.name}</td>
                      <td>{manage?.slug}</td>
                      <td>
                        <Moment locale="bd">{manage?.updatedAt}</Moment>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageCategory;
