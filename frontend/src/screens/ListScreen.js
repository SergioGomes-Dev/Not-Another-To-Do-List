import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Card,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LIST_DELETE_RESET, LIST_EDIT_RESET } from "../constants/listConstants";
import {
  listSingleAction,
  listDeleteAction,
  listEditAction,
} from "../actions/listActions";

const ListScreen = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");

  const [alertShow, setAlertShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const listSingle = useSelector((state) => state.listSingle);
  const { loading, error, list } = listSingle;

  const listDelete = useSelector((state) => state.listDelete);
  const { loading: deleteLoading, error: deleteError, success } = listDelete;

  const listEdit = useSelector((state) => state.listEdit);
  const {
    loading: editLoading,
    error: editError,
    success: editSuccess,
  } = listEdit;

  useEffect(() => {
    if (!userInfo || userInfo.verified === false) {
      navigate("/verify");
    }
    if (userInfo?.verified === false) {
      navigate("/verify");
    }
    dispatch(listSingleAction(id));
  }, [dispatch, id, navigate, userInfo]);

  const deleteClick = () => {
    dispatch(listDeleteAction(id));
  };

  const editClick = () => {
    setTitle(list.name);
    document.getElementById("list-name").classList.toggle("hidden");
    document.getElementById("edit-btn").classList.toggle("hidden");
    document.getElementById("aria-edit-btn").classList.toggle("hidden");
    document.getElementById("x-btn").classList.toggle("hidden");
    document.getElementById("aria-x-btn").classList.toggle("hidden");
    document.getElementById("list-edit-form").classList.toggle("hidden");
  };

  const editListSubmitClick = () => {
    editClick();
    dispatch(listEditAction(id, title));
  };

  const handleAlertClose = () => setAlertShow(false);
  const handleAlertShow = () => {
    setAlertShow(true);
  };

  const redirect = () => {
    navigate("/");
    dispatch({
      type: LIST_DELETE_RESET,
    });
  };

  const refresh = () => {
    dispatch(listSingleAction(id));
    dispatch({
      type: LIST_EDIT_RESET,
    });
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/" aria-label="go back button">
        Go Back
      </Link>
      <Modal show={alertShow} onHide={handleAlertClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="alert-title">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this list?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteClick}>
            Delete
          </Button>
          <Button variant="dark" onClick={handleAlertClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {success && redirect()}
      {deleteLoading ? <Loader /> : editLoading ? <Loader /> : null}
      {deleteError && <Message variant="danger">{deleteError}</Message>}
      {editError && <Message variant="danger">{editError}</Message>}
      {editSuccess && refresh()}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Card className="list">
          <Card.Title as="div" variant="top">
            <strong id="list-name">{list.name}</strong>
            <span
              id="aria-edit-btn"
              tabIndex={0}
              onKeyDown={editClick}
              aria-label="Edit List Button"
            ></span>
            <i
              id="edit-btn"
              class="fa-solid fa-pen-to-square mx-1 point"
              onClick={editClick}
            ></i>

            <span
              id="aria-x-btn"
              tabIndex={0}
              onKeyPress={handleAlertShow}
              aria-label="Delete List Button"
            ></span>
            <i
              id="x-btn"
              class="fa-solid fa-circle-xmark point"
              onClick={handleAlertShow}
            ></i>
            <Form id="list-edit-form" className="hidden">
              <Form.Label>
                <b id="list-edit-b">Edit Title</b>
              </Form.Label>
              <Form.Control
                className="list-edit-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
              <Button className="my-2 inline" onClick={editListSubmitClick}>
                Done
              </Button>
            </Form>
          </Card.Title>
          <ListGroup>
            <>
              {list.content?.map((i) => (
                <ListGroupItem key={i._id}>
                  <Link to={`/list/${id}/${i._id}`}>{i.item}</Link>
                </ListGroupItem>
              ))}
            </>
          </ListGroup>
        </Card>
      )}
    </>
  );
};

export default ListScreen;
