import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import Sidebar from "./Sidebar/Sidebar";

const Dashboard = () => {
  const { log } = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = log;
  console.log(loggedInUser);
  return (
    <div className="overflow-hidden">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col lg={8}>dashboard home page</Col>
      </Row>
    </div>
  );
};

export default Dashboard;
