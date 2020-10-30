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

import { useData, useDataUpdate } from "../contexts/DataContext";

export default function DashboardTable(props) {
  const { heading, data } = props;

  const [serviceID, setserviceID] = useState("");
  const [serviceTitle, setserviceTitle] = useState("");
  const [prices, setprices] = useState([]);
  const [otherInfo, setotherInfo] = useState("");
  const [rowData, setrowData] = useState("");
  const [show, setShow] = useState(false);

  const apiData = useData();
  const toggleUpdate = useDataUpdate();

  const handleShow = (key) => {
    setrowData(key);
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  async function handleSubmitOther(e) {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    const uri = `api/updateOther/${serviceID}/${formDataObj.otherText}`;
    fetch(uri, { method: "PUT" })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        toggleUpdate();
      });

    // await login(userRef.current.value, passwordRef.current.value);
    // setLoading(false);
  }

  function resetStates() {
    setserviceTitle("");
    setprices([]);
    setotherInfo("");
    setserviceID("");
  }

  useEffect(() => {
    resetStates();
  }, [heading]);

  useEffect(() => {
    // When selected changes, query to fill up the table
    if (serviceTitle != "") {
      fetch("api/services/byTitle/" + encodeURIComponent(serviceTitle))
        .then((res) => res.json())
        .then((data) => {
          setserviceID(data._id);
          setserviceTitle(data.title);
          setprices(data.prices);
          setotherInfo(data.other);
        });
    }
  }, [serviceTitle, apiData.data]);
  return (
    <Container className="mt-4 p-5 ">
      <Dropdown className="m-4" styles={{ fontSize: "24px" }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {serviceTitle || "Service"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {data
            .filter((serviceObj) => serviceObj.category === heading)
            .map((service, idx) => {
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
                {/* <th>Service Name</th> */}
                <th>Price</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((priceType) => {
                const key =
                  serviceTitle +
                  "_" +
                  priceType.price +
                  "_" +
                  priceType.serviceType +
                  "_" +
                  serviceID;
                return (
                  <tr key={key} onClick={() => handleShow(key)}>
                    {/* <td key={key + "_1"}>{serviceTitle}</td> */}
                    <td key={key + "_2"}>${priceType.price}</td>
                    <td key={key + "_3"}>{priceType.serviceType}</td>
                  </tr>
                );
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

          <Form onSubmit={handleSubmitOther}>
            <InputGroup className="mt-5 mb-3">
              <Form.Control
                name="otherText"
                placeholder={otherInfo}
                aria-label="Other"
              />
              <InputGroup.Append>
                {/* If information change , allow saving */}
                <Button variant="outline-secondary" type="submit">
                  Save
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </>
      )}
    </Container>
  );
}
