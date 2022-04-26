import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Not Another To Do List</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-sm-auto">
              <LinkContainer to="/account">
                <Nav.Link>
                  <i className="fas fa-user"></i> Account
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/logout">
                <Nav.Link>
                  <i class="fa-solid fa-right-from-bracket"></i> Logout
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
