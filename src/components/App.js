import React, { useState, useEffect } from "react";
import "../App.css";
import NavBar from "./NavBar";
import { NavHashLink } from "react-router-hash-link";
import { Nav, Navbar } from "react-bootstrap";
import Header from "./Header";
import Gallery from "./Gallery";
import Menu from "./Menu";
import Contact from "./Contact";
import Footer from "./Footer";
import jsondata from "../data.json";
import mongoose from "mongoose";

function App() {
  useEffect(() => {
    // for DB, use fetch(), if connection successful that means we can update site with new info
    // mongoose
    //   .connect("mongodb://localhost/AmericanBeautySalons", {})
    //   .then((res) => setdata(res))
    //   .then(setloading(0));

    setdata(jsondata);
    setloading(0)
  }, []);
  const [data, setdata] = useState({});
  const [loading, setloading] = useState(1);
  return (
    <div className="PrimaryColor PrimaryFont">
      <Navbar expand="lg">
        <Navbar.Brand className="navbarBrand" href="#home">
          American Beauty Salons
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link smooth to="#home">
              Home
            </Nav.Link>
            <Nav.Link smooth to="#about">
              About
            </Nav.Link>
            <Nav.Link smooth to="#gallery">
              Gallery
            </Nav.Link>
            <Nav.Link smooth to="#services">
              Services
            </Nav.Link>
            <Nav.Link smooth to="#contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Header />
      {/* <Gallery /> */}
      <Menu data={data} loading={loading}></Menu>
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
