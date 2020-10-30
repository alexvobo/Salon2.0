import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-scroll";
export default function NavBar() {
  return (
    <Navbar collapseOnSelect sticky="top" expand="lg" className="PrimaryColor">
      <Navbar.Brand href="home" className="navbarBrand">
        American Beauty Salons
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav collapseOnSelect className="mr-auto ">
          <Nav.Link>
            <Link
              className="nav-link"
              spy={true}
              smooth={true}
              offset={-70}
              to="/">
              Home
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link
              className="nav-link"
              spy={true}
              smooth={true}
              offset={-70}
              to="gallery">
              Gallery
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link
              className="nav-link"
              spy={true}
              smooth={true}
              offset={-70}
              to="services">
              Services
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link
              className="nav-link"
              spy={true}
              smooth={true}
              offset={-70}
              to="contact">
              Contact
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
