import { ListGroup, ListGroupItem } from "react-bootstrap";

const Item = ({ item }) => {
  return (
    <ListGroup>
      <ListGroupItem>Title: {item.item}</ListGroupItem>
      <ListGroupItem>Notes: {item.notes}</ListGroupItem>
      <ListGroupItem>Completed: {item.completed}</ListGroupItem>
      <ListGroupItem>Priority: {item.priority}</ListGroupItem>
      <ListGroupItem>Deadline: {item.deadline}</ListGroupItem>
      <ListGroupItem>Recurring: {item.recurring}</ListGroupItem>
      <ListGroupItem>Repeats: {item.repeats}</ListGroupItem>
    </ListGroup>
  );
};

export default Item;
