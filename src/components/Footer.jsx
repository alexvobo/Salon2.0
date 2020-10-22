import React from "react";
import { Container, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <Container fluid>
      <Row className="justify-content-center m-3 footer-text">
        Copyright © American Beauty Salons
      </Row>
    </Container>
  );
}
