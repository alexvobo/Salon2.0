import React, { useRef } from "react";

import { Container, Button, Table, Form, InputGroup } from "react-bootstrap";
export default function Dashboard(props) {
  const {} = props;
  const userRef = useRef();
const passwordRef = useRef();
  return (
    <Container className="mt-4 blackbox">
      <h1>Hello userName,</h1>
      <Container className="mt-4 p-5 blackbox">
        <Form>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>
              {/* Category */}
              <h2>Haircuts: </h2>
            </Form.Label>
            <Form.Control as="select" custom>
              {/* Service Types */}
              <option>Haircut</option>
              <option>Haircut and Styling</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <Container className="mb-5 ">
          <Button
            variant="secondary"
            size="sm "
            className="float-right mb-3"
            active>
            Remove
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="float-right mr-1 mb-3 "
            active>
            Add
          </Button>{" "}
        </Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Price</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Haircut</td>
              <td>45</td>
              <td>Mens</td>
            </tr>
            <tr>
              <td>Haircut</td>
              <td>50</td>
              <td>Short Hair</td>
            </tr>
            <tr>
              <td>Haircut</td>
              <td>60</td>
              <td>Long Hair</td>
            </tr>
          </tbody>
        </Table>
        <Container className="mb-5 ">
          <Button
            variant="secondary"
            size="sm "
            className="float-right mb-3"
            active>
            Remove
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="float-right mr-1 mb-3 "
            active>
            Add
          </Button>{" "}
        </Container>
        <InputGroup className="mt-5 mb-3">
          <Form.Control
            placeholder="Already saved other message..."
            aria-label="Other"
          />
          <InputGroup.Append>
            {/* If information change , allow saving */}
            <Button variant="outline-secondary">Save</Button>
          </InputGroup.Append>
        </InputGroup>
      </Container>
    </Container>
  );
}
