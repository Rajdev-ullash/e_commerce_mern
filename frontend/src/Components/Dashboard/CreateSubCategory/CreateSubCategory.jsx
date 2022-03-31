import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import Sidebar from "../Sidebar/Sidebar";
import "../CreateCategory/CreateCategory.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../../App";

const CreateSubCategory = () => {
  const { token } = useContext(UserContext);
  const [tokenData, setTokenData] = token;
  console.log(tokenData);

  const [subCategoryName, setSubCategoryName] = useState("");

  const [subData, setSubData] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState("");
  console.log(subCategoryId);
  console.log(subData);

  useEffect(() => {
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
        console.log(data.result);
        setSubData(data.result);
      });
  }, []);

  const subCategoryPost = async (e) => {
    e.preventDefault();
    if (!subCategoryName || !subCategoryId) {
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

    try {
      await fetch("http://localhost:5000/api/subCategory/createSubCategory", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: subCategoryName,
          categoryId: subCategoryId,
        }),
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="overflow-hidden category_design">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col lg={8}>
          <Form className="w-50 m-auto form_shadow">
            <div className="">
              <Form.Group
                className="mb-3 form_design mt-5"
                controlId="formBasicEmail"
              >
                <Form.Label className="mt-5 category_heading">
                  SubCategory Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Write your Category Name"
                  className="mt-2"
                  onChange={(e) => setSubCategoryName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formGridState" className="m-4">
                <Form.Label className="category_heading">
                  Select Category
                </Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  className="form-control"
                  onChange={(e) => setSubCategoryId(e.target.value)}
                >
                  <option>Choose...</option>
                  {subData.map((data) => (
                    <option value={data._id} key={data._id}>
                      {data.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Button
                onClick={(e) => subCategoryPost(e)}
                className="category_button"
                type="submit"
              >
                Create Category
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default CreateSubCategory;
