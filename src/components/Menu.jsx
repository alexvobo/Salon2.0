import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { useData } from "../contexts/DataContext";
import ServiceList from "./ServiceList";

function renderData(data, headings) {
  return (
    <Container className=" blackbox ">
      <Row className="mt-4 justify-content-center">
        <h1>Our Services</h1>
      </Row>
      <Row className="justify-content-center">
        {headings.map((serviceObj) => {
          const heading = serviceObj;
          // Insert all of the services into the table:
          const filt_data = data.filter(
            (dataObj) => dataObj.category === heading
          );
          return <ServiceList heading={heading} services={filt_data} />;
        })}
      </Row>
    </Container>
  );
}
export default function Menu() {
  // Map over headings for our table
  const apiData = useData();
  return (
    <Container
      id="services"
      fluid
      className=" mb-3 justify-content-center text-center">
      {apiData.loaded ? (
        renderData(apiData.data, apiData.headings)
      ) : (
        <Spinner animation="border" variant="danger" />
      )}
      <br></br>
      <br></br>
    </Container>
  );
}
