import React from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import Gallery from "./Gallery";
import Menu from "./Menu";
import Contact from "./Contact";
import Footer from "./Footer";

export default function AppMain(props) {
  const { data, loading } = props;
  return (
    <>
      <NavBar />
      <Header id="home" />
      <Gallery id="gallery" />
      <Menu id="services" data={data} loading={loading} />
      <Contact id="contact" />
      <Footer />
    </>
  );
}
