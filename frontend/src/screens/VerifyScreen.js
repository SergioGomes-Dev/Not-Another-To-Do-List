import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { sendEmailAction, logoutAction } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const VerifyScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userEmail = useSelector((state) => state.userEmail);
  const { loading, success, error } = userEmail;

  const sendEmailClick = () => {
    dispatch(sendEmailAction(userInfo.email, userInfo._id));
    document.getElementById("alert").focus();
  };

  const goBackClick = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    if (userInfo?.verified === true) {
      navigate("/");
    }
  });

  return (
    <>
      <Link
        className="btn btn-dark my-3"
        to="/"
        aria-label="go back button"
        onClick={goBackClick}
      >
        Go Back
      </Link>
      {loading && <Loader />}
      <div id="alert" tabIndex={0}>
        {error && <Message>{error}</Message>}
        {success && <Message variant="success">{success}</Message>}
      </div>

      <div className="text-center bg-secondary p-5">
        <h1>Verify your Email to Login!</h1>
        <h4>
          <b>Email:</b> {userInfo?.email}
        </h4>
        <h5>Make sure to check your junk folder</h5>
        <Button variant="dark" onClick={sendEmailClick}>
          Send Verification Email
        </Button>
      </div>
    </>
  );
};

export default VerifyScreen;
