import React, { useState, useEffect } from "react";
import "../App.css";
import NavBar from "./NavBar";
import { Nav, Navbar, Button } from "react-bootstrap";
import Header from "./Header";
import Gallery from "./Gallery";
import Menu from "./Menu";
import Contact from "./Contact";
import Footer from "./Footer";
import jsondata from "../data.json";

function App() {
  useEffect(() => {
    // for DB, use fetch(), if connection successful that means we can update site with new info
    // mongoose
    //   .connect("mongodb://localhost/AmericanBeautySalons", {})
    //   .then((res) => setdata(res))
    //   .then(setloading(0));

    setdata(jsondata);
    setloading(0);
  }, []);

  const [data, setdata] = useState({});
  const [loading, setloading] = useState(1);
  return (
    <div className=" PrimaryColor PrimaryFont">
      <NavBar />
      <Header id="home" />
      <Gallery id="gallery" />
      <Menu id="services" data={data} loading={loading} />
      <Contact id="contact" />
      <Footer />
    </div>
  );
}

export default App;
