import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import Sidebar from "../Sidebar/Sidebar";
import "../CreateCategory/CreateCategory.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../../App";
import { useParams } from "react-router-dom";

const EditCategory = () => {
  const { token } = useContext(UserContext);
  const [tokenData, setTokenData] = token;
  const [editCategory, setEditCategory] = useState({});
  const { slug } = useParams();
  console.log(slug);
  const categoryPost = async (e) => {
    e.preventDefault();
    if (!editCategory) {
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
      await fetch(`http://localhost:5000/api/category/updateCategory/${slug}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${tokenData}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editCategory }),
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
                  Edit Category
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Write your Category Name"
                  className="mt-2"
                  onChange={(e) => setEditCategory(e.target.value)}
                />
              </Form.Group>

              <Button
                onClick={categoryPost}
                className="category_button"
                type="submit"
              >
                Edit Category
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default EditCategory;
