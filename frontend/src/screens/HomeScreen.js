import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import List from "../components/List";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listsAllAction } from "../actions/listActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const listsAll = useSelector((state) => state.listsAll);
  const { loading, error, lists } = listsAll;

  useEffect(() => {
    dispatch(listsAllAction());
  }, [dispatch]);

  return (
    <>
      <h1>All Lists</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {lists.map((list) => (
            <Col key={list._id} sm={12} md={6} lg={4} xl={4}>
              <List list={list} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
