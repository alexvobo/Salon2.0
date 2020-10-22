import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import ServiceList from "./ServiceList";
function renderData(data) {
  // Map over headings for our table
  return (
    <Container fluid className=" blackbox ">
      <Row fluid className='justify-content-center'>
        {Object.keys(data).map((heading) => {
          // Each heading contains services
          const services = data[heading];
          // Insert all of the services into the table DOC:
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
