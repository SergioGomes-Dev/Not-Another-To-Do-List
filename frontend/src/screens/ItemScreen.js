import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import Item from "../components/Item";
import { ITEM_EDIT_RESET, ITEM_CHECK_RESET } from "../constants/itemConstants";
import {
  itemSingleAction,
  itemEditAction,
  itemCheckAction,
} from "../actions/itemActions";

const ItemScreen = () => {
  const [editItem, setEditItem] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("");

  const dispatch = useDispatch();

  const { id, itemid } = useParams();

  const itemSingle = useSelector((state) => state.itemSingle);
  const { loading, error, item } = itemSingle;

  const itemEdit = useSelector((state) => state.itemEdit);
  const {
    loading: editLoading,
    error: editError,
    success: editSuccess,
  } = itemEdit;

  const itemCheck = useSelector((state) => state.itemCheck);
  const {
    loading: checkLoading,
    error: checkError,
    success: checkSuccess,
  } = itemCheck;

  useEffect(() => {
    dispatch(itemSingleAction(id, itemid));
  }, [dispatch, id, itemid]);

  const editItemHandler = (e) => {
    e.preventDefault();
    document.getElementById("container").classList.toggle("hidden");
    setEditItem(false);
    dispatch(itemEditAction(id, itemid, title, notes, priority));
  };

  const editClick = () => {
    document.getElementById("container").classList.toggle("hidden");
    setEditItem(true);
    setTitle(item.item);
    setNotes(item.notes);
    setPriority(item.priority);
  };

  const priorityChange = (e) => {
    setPriority(e.target.value);
  };

  const checkToggleClick = () => {
    dispatch(itemCheckAction(id, itemid));
  };

  const refresh = () => {
    dispatch(itemSingleAction(id, itemid));
    dispatch({ type: ITEM_EDIT_RESET });
    dispatch({ type: ITEM_CHECK_RESET });
    setEditItem(false);
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to={`/list/${id}`}>
        Go Back
      </Link>

      {editSuccess && refresh()}
      {checkSuccess && refresh()}
      {error && <Message variant="danger">{error}</Message>}
      {editError && <Message variant="danger">{editError}</Message>}
      {checkError && <Message variant="danger">{checkError}</Message>}
      {loading ? (
        <Loader />
      ) : editLoading ? (
        <Loader />
      ) : checkLoading ? (
        <Loader />
      ) : (
        <FormContainer>
          {editItem === false && (
            <>
              <Item id="item" item={item} />
              <Button className="my-2" onClick={editClick}>
                Edit
              </Button>
            </>
          )}

          <Form id="container" className="hidden" onSubmit={editItemHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                className="textarea"
                as="textarea"
                rows="5"
                cols="3"
                placeholder="Enter notes for the item"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="completed">
              <Form.Label>Completed</Form.Label>
              <Form.Check
                className="inline mx-2"
                checked={item.completed}
                onChange={checkToggleClick}
              ></Form.Check>
            </Form.Group>
            <Form.Group controlId="priority">
              <Form.Label>Priority: {priority}</Form.Label>
              <Form.Select
                aria-label="Select Priority"
                onChange={priorityChange}
                tabIndex={0}
              >
                <option value={priority}>Select a priority</option>
                <option value="None">None</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Very High">Very High</option>
              </Form.Select>
            </Form.Group>
            <Button className="my-2" type="submit" variant="dark">
              Submit Edit
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default ItemScreen;
