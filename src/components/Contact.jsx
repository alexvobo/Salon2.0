import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMailBulk,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function Contact() {
  return (
    <div id="contact">
      <iframe
      id = "goog_map"
        className="pb-5"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDzw76uNc7ZCKbWaEqJzr2wFnl0ZYvCRjc&amp;q=American+Beauty+Salons,+100+William+St,+New+York,+NY+10038"
        style={{ border: 0 }}
        allowFullScreen=""
        width="100%"
        height="400px"
        frameBorder="0"
      />
      <Container className="pb-5 blackbox">
        <Row className="mt-4 justify-content-center contactTitle">
          American Beauty Salons
        </Row>
        <Row className="mt-3 justify-content-center">
          <a
            target="_blank"
            href="https://goo.gl/maps/8erzR58SsyZHJpbM7"
            style={{ textDecoration: "none" }}>
            <p className="contactInfo text-center">
              100 William St
              <br />
              New York, NY 10038
            </p>
          </a>
        </Row>
        <Row className="justify-content-center text-center pb-3">
          <ul className="list-unstyled contactInfo ">
            <li>Monday - Friday: 10:00 AM - 8:00 PM</li>
            <li>Saturday: 11:00 AM - 7:00 PM</li>
            <li>Sunday: 11:00 AM - 6:00 PM</li>
            <br />
            <li>
              <FontAwesomeIcon icon={faPhone} size="1x" />
              <a className="contactInfo" href="tel:+19292101542">
                {"  "}
                +1 (929) 210 1542
              </a>
            </li>
            <li>
              <FontAwesomeIcon icon={faMailBulk} size="1x" />
              <a
                className="contactInfo"
                href="mailto:info.americanbeautysalons@gmail.com">
                {"  "}
                info.americanbeautysalons@gmail.com
              </a>
            </li>
          </ul>
        </Row>
        <Row className="justify-content-center ">
          <Col className="text-center">
            <a
              target="_blank"
              href="https://www.instagram.com/americanbeautysalons/">
              <FontAwesomeIcon icon={faInstagram} size="5x" />
            </a>
          </Col>
          <Col className="text-center">
            <a
              target="_blank"
              href="https://www.facebook.com/americanbeautysalons/">
              <FontAwesomeIcon icon={faFacebook} size="5x" />
            </a>
          </Col>
          <Col className="text-center">
            <a target="_blank" href="https://ab.simplybook.me/v2/">
              <FontAwesomeIcon icon={faCalendarAlt} size="5x" />
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
