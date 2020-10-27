import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  InputGroup,
  Button,
  Container,
  Dropdown,
  Modal,
} from "react-bootstrap";
import ModifyTableRow from "./ModifyTableRow";
export default function DashboardTable(props) {
  const { heading, data } = props;

  const [serviceTitle, setserviceTitle] = useState("");
  const [prices, setprices] = useState([]);
  const [otherInfo, setotherInfo] = useState("");
  const [rowData, setrowData] = useState("");
  const [show, setShow] = useState(false);

  const handleShow = (key) => {
    setrowData(key);
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  function resetStates() {
    setserviceTitle("");
    setprices([]);
    setotherInfo("");
  }

  useEffect(() => {
    resetStates();
  }, [heading]);

  useEffect(() => {
    // When selected changes, query to fill up the table
    if (serviceTitle != "") {
      const service = data
        .filter((allCategories) => allCategories.category === heading)[0]
        .services.filter((serviceObj) => serviceObj.title == serviceTitle)[0];
      setserviceTitle(service.title);
      setprices(service.prices);
      setotherInfo(service.other);
      console.log(service);
    }
  }, [serviceTitle]);
  return (
    <Container className="mt-4 p-5 ">
      <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>
            {/* Category */}
            <h2>{heading}: </h2>
          </Form.Label>
          <Dropdown className="m-4" styles={{ fontSize: "24px" }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {serviceTitle || "Service"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {data
                .filter((serviceObj) => serviceObj.category === heading)[0]
                .services.map((service, idx) => {
                  return (
                    <Dropdown.Item
                      key={idx}
                      onSelect={() => setserviceTitle(service.title)}>
                      {service.title}
                    </Dropdown.Item>
                  );
                })}
            </Dropdown.Menu>
          </Dropdown>
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
        </Button>
      </Container>
      {serviceTitle != "" && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Price</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {data.map((serviceObj) => {
                if (serviceObj.category === heading) {
                  return serviceObj.services.map((service, idx2) => {
                    if (service.title === serviceTitle) {
                      return prices.map((priceType) => {
                        const key =
                          service.title +
                          "_" +
                          priceType.price +
                          "_" +
                          priceType.serviceType;
                        return (
                          <tr key={key} onClick={() => handleShow(key)}>
                            <td key={key + "_1"}>{service.title}</td>
                            <td key={key + "_2"}>${priceType.price}</td>
                            <td key={key + "_3"}>{priceType.serviceType}</td>
                          </tr>
                        );
                      });
                    }
                  });
                }
              })}
            </tbody>
          </Table>

          <Modal show={show} onHide={handleClose} animation={false}>
            <ModifyTableRow
              data={data}
              rowData={rowData}
              handleClose={handleClose}
            />
          </Modal>

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
              placeholder={otherInfo}
              aria-label="Other"
              // onSubmit={}
            />
            <InputGroup.Append>
              {/* If information change , allow saving */}
              <Button variant="outline-secondary" type="submit">
                Save
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </>
      )}
    </Container>
  );
}
