import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { emailVerifyAction, loginAction } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const EmailScreen = () => {
  const { emailtoken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userVerify = useSelector((state) => state.userVerify);
  const { loading, error, success } = userVerify;

  const verifyEmailClick = () => {
    dispatch(emailVerifyAction(emailtoken));
  };

  const loginClick = () => {
    navigate("/login");
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {success && <Message variant="success">{success}</Message>}

      <div className="text-center py-5">
        {!success && (
          <Button
            variant="success"
            className="text-center"
            onClick={verifyEmailClick}
          >
            Verify Email
          </Button>
        )}
        {success && (
          <Button variant="dark" onClick={loginClick}>
            Login
          </Button>
        )}
      </div>
    </>
  );
};

export default EmailScreen;
