import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ListGroup, ListGroupItem, Card } from "react-bootstrap";
import axios from "axios";

const ListScreen = () => {
  const [list, setList] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchList = async () => {
      const { data } = await axios.get(`/api/lists/${id}`);

      setList(data);
    };

    fetchList();
  }, [id]);

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
