import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { ListGroup, ListGroupItem, Card } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listSingleAction } from "../actions/listActions";

const ListScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listSingle = useSelector((state) => state.listSingle);
  const { loading, error, list } = listSingle;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || userInfo.verified === false) {
      navigate("/verify");
    }
    if (userInfo?.verified === false) {
      navigate("/verify");
    }
    dispatch(listSingleAction(id));
  }, [dispatch, id, navigate, userInfo]);

  return (
    <>
      <Link className="btn btn-dark my-3" to="/" aria-label="go back button">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
      )}
    </>
  );
};

export default ListScreen;
