import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import Item from "../components/Item";
import { itemSingleAction } from "../actions/itemActions";

const ItemScreen = () => {
  const [editItem, setEditItem] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("");

  const dispatch = useDispatch();

  const { id, itemid } = useParams();

  const itemSingle = useSelector((state) => state.itemSingle);
  const { loading, error, item } = itemSingle;

  useEffect(() => {
    dispatch(itemSingleAction(id, itemid));
  }, [dispatch, id, itemid]);

  const editItemHandler = (e) => {
    e.preventDefault();
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

  return (
    <>
      <Link className="btn btn-dark my-3" to={`/list/${id}`}>
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
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
              />
            </Form.Group>
            <Form.Group controlId="completed">
              <Form.Label>Completed</Form.Label>
              <Form.Check
                className="inline mx-2"
                checked={item.completed}
              ></Form.Check>
            </Form.Group>
            <Form.Group controlId="priority">
              <Form.Label>Priority: {priority}</Form.Label>
              <Form.Select
                aria-label="Select Priority"
                onChange={priorityChange}
              >
                <option value={priority}>Select a priority</option>
                <option value="None">1. None</option>
                <option value="Low">2. Low</option>
                <option value="Medium">3. Medium</option>
                <option value="High">4. High</option>
                <option value="Very High">5. Very High</option>
              </Form.Select>
            </Form.Group>
            <Button className="my-2" type="submit" variant="dark">
              Sumbit Edit
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default ItemScreen;
