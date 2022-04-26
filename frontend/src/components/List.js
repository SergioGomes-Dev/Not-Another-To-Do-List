import React from "react";
import { Link } from "react-router-dom";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const List = ({ list }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/list/${list._id}`}>
        <Card.Title as="div" variant="top">
          <h6 className="bold">{list.name}</h6>
        </Card.Title>
      </Link>
      <ListGroup>
        <>
          {list.content?.map((i) => (
            <ListGroupItem key={i._id}>{i.item}</ListGroupItem>
          ))}
        </>
      </ListGroup>
    </Card>
  );
};

export default List;
