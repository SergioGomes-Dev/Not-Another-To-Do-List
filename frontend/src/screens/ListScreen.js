import React from "react";
import { Link, useParams } from "react-router-dom";
import { ListGroup, ListGroupItem, Card } from "react-bootstrap";
import lists from "../sampleLists";

const ListScreen = () => {
  const { id } = useParams();
  const list = lists.find((p) => p._id === id);

  return (
    <>
      <Link className="btn btn-dark my-3" to="/" aria-label="go back button">
        Go Back
      </Link>
      <Card className="list">
        <Card.Title as="div" variant="top">
          <strong>{list.name}</strong>
        </Card.Title>
        <ListGroup>
          <>
            {list.content?.map((i) => (
              <ListGroupItem key={i._id}>{i.item}</ListGroupItem>
            ))}
          </>
        </ListGroup>
      </Card>
    </>
  );
};

export default ListScreen;
