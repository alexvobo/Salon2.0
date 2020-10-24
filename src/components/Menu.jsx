import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import ServiceList from "./ServiceList";
function renderData(data) {
  // Map over headings for our table
  return (
    <Container fluid className=" blackbox ">
      <Row fluid className="mt-4 justify-content-center">
        <h1>Our Services</h1>
      </Row>
      <Row fluid className="justify-content-center">
        {data.map((serviceObj) => {
          const heading = serviceObj.category;
          const services = serviceObj.services;

          // Insert all of the services into the table:
          return <ServiceList heading={heading} services={services} />;
        })}
      </Row>
    </Container>
  );
}
export default function Menu(props) {
  const { loading, data } = props;

  return (
    <Container
      id="services"
      fluid
      className=" mb-3 justify-content-center text-center">
      {loading ? (
        <Spinner animation="border" variant="danger" />
      ) : (
        renderData(data)
      )}
      <br></br>
      <br></br>
    </Container>
  );
}
