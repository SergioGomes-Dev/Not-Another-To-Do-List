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
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import PriorityBadge from "../components/PriorityBadge";
import { LIST_DELETE_RESET, LIST_EDIT_RESET } from "../constants/listConstants";
import {
  ITEM_ADD_RESET,
  ITEM_DELETE_RESET,
  ITEM_CHECK_RESET,
} from "../constants/itemConstants";
import {
  listSingleAction,
  listDeleteAction,
  listEditAction,
} from "../actions/listActions";
import {
  itemCreateAction,
  itemDeleteAction,
  itemCheckAction,
} from "../actions/itemActions";

const ListScreen = () => {
  const { id } = useParams();
  const [itemId, setItemId] = useState("");
  const [title, setTitle] = useState("");
  const [itemTitle, setItemTitle] = useState("");

  const [alertShow, setAlertShow] = useState(false);
  const [alertItemShow, setAlertItemShow] = useState(false);

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

  const itemAdd = useSelector((state) => state.itemAdd);
  const {
    loading: itemAddLoading,
    error: itemAddError,
    success: itemAddSuccess,
  } = itemAdd;

  const itemDelete = useSelector((state) => state.itemDelete);
  const {
    loading: itemDeleteLoading,
    error: itemDeleteError,
    success: itemDeleteSuccess,
  } = itemDelete;

  const itemCheck = useSelector((state) => state.itemCheck);
  const {
    loading: itemCheckLoading,
    error: itemCheckError,
    success: itemCheckSuccess,
  } = itemCheck;

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

  const addItemClick = () => {
    document.getElementById("add-item-form").classList.toggle("hidden");
    document.getElementById("add-new-item-prompt").classList.toggle("hidden");
  };

  const submitAddItem = (e) => {
    e.preventDefault();
    document.getElementById("add-item-form").classList.toggle("hidden");
    document.getElementById("add-new-item-prompt").classList.toggle("hidden");
    dispatch(itemCreateAction(id, itemTitle));
  };

  const handleAlertClose = () => setAlertShow(false);
  const handleAlertShow = () => {
    setAlertShow(true);
  };

  const handleAlertItemShow = (e) => {
    setAlertItemShow(true);
    setItemId(e.target.id);
  };
  const handleAlertItemClose = () => setAlertItemShow(false);

  const itemDeleteHandler = () => {
    dispatch(itemDeleteAction(id, itemId));
    setAlertItemShow(false);
  };

  const checkToggleClick = (e) => {
    dispatch(itemCheckAction(id, e.target.id));
  };

  const redirect = () => {
    navigate("/");
    dispatch({
      type: LIST_DELETE_RESET,
    });
  };

  const notesToolTip = (props) => (
    <Tooltip id="notes-tooltip" {...props}>
      This Item has notes
    </Tooltip>
  );

  const refresh = () => {
    setTitle("");
    setItemTitle("");
    dispatch(listSingleAction(id));
    dispatch({ type: LIST_EDIT_RESET });
    dispatch({ type: ITEM_ADD_RESET });
    dispatch({ type: ITEM_DELETE_RESET });
    dispatch({ type: ITEM_CHECK_RESET });
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
      <Modal show={alertItemShow} onHide={handleAlertItemClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="alert-title">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={itemDeleteHandler}>
            Delete
          </Button>
          <Button variant="dark" onClick={handleAlertItemClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {success && redirect()}
      {deleteLoading ? (
        <Loader />
      ) : editLoading ? (
        <Loader />
      ) : itemAddLoading ? (
        <Loader />
      ) : itemDeleteLoading ? (
        <Loader />
      ) : itemCheckLoading ? (
        <Loader />
      ) : null}
      {deleteError && <Message variant="danger">{deleteError}</Message>}
      {editError && <Message variant="danger">{editError}</Message>}
      {itemAddError && <Message variant="danger">{itemAddError}</Message>}
      {itemDeleteError && <Message variant="danger">{itemDeleteError}</Message>}
      {itemCheckError && <Message variant="danger">{itemCheckError}</Message>}
      {editSuccess && refresh()}
      {itemAddSuccess && refresh()}
      {itemDeleteSuccess && refresh()}
      {itemCheckSuccess && refresh()}
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
                  <Form.Check
                    id={i._id}
                    className="inline mx-2"
                    checked={i.completed}
                    onChange={checkToggleClick}
                    aria-label={`${i.item}`}
                  ></Form.Check>
                  <Link to={`/list/${id}/${i._id}`}>{i.item}</Link>
                  <PriorityBadge priority={i.priority} />

                  {i.notes && (
                    <>
                      <span
                        tabIndex={0}
                        aria-label="This Item has notes"
                      ></span>
                      <OverlayTrigger
                        overlay={notesToolTip}
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                      >
                        <i class="fa-solid fa-pencil ms-1 point"></i>
                      </OverlayTrigger>
                    </>
                  )}
                  <span
                    id={i._id}
                    className="item-x"
                    tabIndex={0}
                    onKeyPress={handleAlertItemShow}
                    aria-label="Delete List Button"
                  ></span>
                  <i
                    id={i._id}
                    class="fa-solid fa-circle-xmark point mx-2 item-x"
                    onClick={handleAlertItemShow}
                  ></i>
                </ListGroupItem>
              ))}
            </>
          </ListGroup>
          <div id="add-new-item-prompt" className="mx-1 my-3">
            <h6 className="inline">Add a new item</h6>
            <span
              id="aria-add-item-btn"
              tabIndex={0}
              onKeyDown={addItemClick}
              aria-label="Add Item Button"
            ></span>
            <i
              id="add-item-toggle inline"
              class="fa-solid fa-circle-plus point"
              onClick={addItemClick}
            ></i>
          </div>
          <Form
            id="add-item-form"
            className="hidden my-3"
            onSubmit={submitAddItem}
          >
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Enter title for new item"
              value={itemTitle}
              onChange={(e) => setItemTitle(e.target.value)}
            ></Form.Control>
            <Button className="my-2" type="submit">
              Add Item
            </Button>
          </Form>
        </Card>
      )}
    </>
  );
};

export default ListScreen;
