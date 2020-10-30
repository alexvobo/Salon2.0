import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-scroll";
export default function NavBar() {
  return (
    <Navbar sticky="top" expand="lg" className="PrimaryColor ">
      <Navbar.Brand className="navbarBrand">
        American Beauty Salons
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto ">
          <Link
            className="nav-link"
            spy={true}
            smooth={true}
            offset={-70}
            to="home">
            Home
          </Link>
          <Link
            className="nav-link"
            spy={true}
            smooth={true}
            offset={-70}
            to="gallery">
            Gallery
          </Link>
          <Link
            className="nav-link"
            spy={true}
            smooth={true}
            offset={-70}
            to="services">
            Services
          </Link>
          <Link
            className="nav-link"
            spy={true}
            smooth={true}
            offset={-70}
            to="contact">
            Contact
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
