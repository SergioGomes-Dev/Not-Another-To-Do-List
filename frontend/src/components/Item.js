import { Form, ListGroup, ListGroupItem } from "react-bootstrap";

const Item = ({ item }) => {
  return (
    <ListGroup>
      <ListGroupItem>Title: {item.item}</ListGroupItem>
      <ListGroupItem>
        Notes:
        <Form.Control
          className="textarea"
          as="textarea"
          rows="5"
          cols="3"
          value={item.notes}
        ></Form.Control>
      </ListGroupItem>
      {item.completed ? (
        <ListGroupItem>Completed: True</ListGroupItem>
      ) : (
        <ListGroupItem>Completed: False</ListGroupItem>
      )}
      <ListGroupItem>Priority: {item.priority}</ListGroupItem>
      <ListGroupItem>Deadline: {item.deadline}</ListGroupItem>
      <ListGroupItem>Recurring: {item.recurring}</ListGroupItem>
      <ListGroupItem>Repeats: {item.repeats}</ListGroupItem>
    </ListGroup>
  );
};

export default Item;
