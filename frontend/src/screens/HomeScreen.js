import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import List from "../components/List";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listsAllAction, listCreateAction } from "../actions/listActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const listsAll = useSelector((state) => state.listsAll);
  const { loading, error, lists } = listsAll;

  const listCreate = useSelector((state) => state.listCreate);
  const {
    loading: listCreateLoading,
    error: listCreateError,
    success,
  } = listCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo?.verified === false) {
      navigate("/login");
    }
    dispatch(listsAllAction());
  }, [dispatch, navigate, userInfo]);

  const newListClick = () => {
    document.getElementById("add-new-list").classList.toggle("hidden");
  };

  const newListPress = () => {
    document.getElementById("add-new-list").classList.toggle("hidden");
    document.getElementById("add-list-text").focus();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listCreateAction(name));
    dispatch(listsAllAction());
  };

  return (
    <>
      {listCreateError && <Message variant="danger">{listCreateError}</Message>}
      {success && <Message variant="success">Created a New List</Message>}

      {loading ? (
        <Loader />
      ) : listCreateLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <div>
            <h1 className="m-auto">All Lists</h1>
            <h5 className="inline">Add a new list</h5>
            <span
              tabIndex={0}
              onKeyPress={newListPress}
              aria-label="Press to open add list menu"
            ></span>
            <i
              className="fa-solid fa-circle-plus point"
              onClick={newListClick}
            ></i>
          </div>

          <Form id="add-new-list" className="hidden" onSubmit={submitHandler}>
            <div className="add-list-wrapper mt-3">
              <Form.Label>List Title</Form.Label>
              <Form.Control
                id="add-list-text"
                type="text"
                placeholder="Enter the title of your new list"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
              <Button type="submit" variant="dark" className="mt-3">
                Add List
              </Button>
            </div>
          </Form>

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
