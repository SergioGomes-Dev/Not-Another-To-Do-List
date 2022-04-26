import React, { useState, useEffect } from "react";
import List from "../components/List";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const HomeScreen = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const { data } = await axios.get("/api/lists");

      setLists(data);
    };
    fetchLists();
  }, []);

  return (
    <>
      <h1>All Lists</h1>
      <Row>
        {lists.map((list) => (
          <Col key={list._id} sm={12} md={6} lg={4} xl={4}>
            <List list={list} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
