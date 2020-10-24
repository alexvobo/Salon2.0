import React from "react";
import { Image, Container, Button } from "react-bootstrap";
import bg from "../img/bg.jpg";
export default function Header() {
  return (
    // style={{ border: "5px solid black" }}
    <Container id="home" fluid className="text-center">
      <Image src={bg} alt="bg" fluid />
      <Button
        href="https://ab.simplybook.me/v2/"
        target="_blank"
        variant="success"
        size="lg"
        style={{
          fontSize: "40px",
          position: "relative",
          top: "-130px",
          fontFamily: "Times New Roman",
        }}>
        BOOK
      </Button>
    </Container>
  );
}
