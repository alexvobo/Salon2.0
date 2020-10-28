import React, { useState, useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import ServiceList from "./ServiceList";
function renderData(data, headings) {
  return (
    <Container fluid className=" blackbox ">
      <Row fluid className="mt-4 justify-content-center">
        <h1>Our Services</h1>
      </Row>
      <Row fluid className="justify-content-center">
        {headings.map((serviceObj) => {
          const heading = serviceObj;
          // Insert all of the services into the table:
          const filt_data = data.filter((o) => o.category === heading);
          return <ServiceList heading={heading} services={filt_data} />;
        })}
      </Row>
    </Container>
  );
}
export default function Menu(props) {
  const { loading, data, headings } = props;
  // Map over headings for our table

  return (
    <Container
      id="services"
      fluid
      className=" mb-3 justify-content-center text-center">
      {loading ? (
        <Spinner animation="border" variant="danger" />
      ) : (
        renderData(data, headings)
      )}
      <br></br>
      <br></br>
    </Container>
  );
}
