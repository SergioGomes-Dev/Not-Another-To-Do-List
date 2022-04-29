import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ListGroup, ListGroupItem, Card, Modal, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LIST_DELETE_RESET } from "../constants/listConstants";
import { listSingleAction, listDeleteAction } from "../actions/listActions";

const ListScreen = () => {
  const { id } = useParams();

  const [alertShow, setAlertShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const listSingle = useSelector((state) => state.listSingle);
  const { loading, error, list } = listSingle;

  const listDelete = useSelector((state) => state.listDelete);
  const { loading: deleteLoading, error: deleteError, success } = listDelete;

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

  const redirect = () => {
    navigate("/");
    dispatch({
      type: LIST_DELETE_RESET,
    });
  };

  const handleAlertClose = () => setAlertShow(false);
  const handleAlertShow = () => {
    setAlertShow(true);
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
      {deleteLoading && <Loader />}
      {deleteError && <Message variant="danger">{deleteError}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Card className="list">
          <Card.Title as="div" variant="top">
            <strong>{list.name}</strong>
            <span
              tabIndex={0}
              onKeyDown={handleAlertShow}
              aria-label="Delete List Button"
            ></span>
            <i
              class="fa-solid fa-circle-xmark point"
              onClick={handleAlertShow}
            ></i>
          </Card.Title>
          <ListGroup>
            <>
              {list.content?.map((i) => (
                <ListGroupItem key={i._id}>{i.item}</ListGroupItem>
              ))}
            </>
          </ListGroup>
        </Card>
      )}
    </>
  );
};

export default ListScreen;
