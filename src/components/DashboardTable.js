import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  InputGroup,
  Button,
  Container,
  ListGroup,
  Modal,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import ModifyTableRowModal from "./ModifyTableRowModal";
import RenameModal from "./RenameModal";
import AddRemoveServiceModal from "./AddRemoveServiceModal";

import { useData, useDataUpdate } from "../contexts/DataContext";

export default function DashboardTable(props) {
  const { heading } = props;

  const [serviceID, setserviceID] = useState("");
  const [serviceTitle, setserviceTitle] = useState("");
  const [prices, setprices] = useState([]);
  const [otherInfo, setotherInfo] = useState("");
  const [rowData, setrowData] = useState("");

  const apiData = useData();
  const toggleUpdate = useDataUpdate();

  const [showModify, setShowModify] = useState(false);
  const handleCloseModify = () => setShowModify(false);
  const [showRename, setShowRename] = useState(false);
  const handleCloseRename = () => setShowRename(false);
  const [showAdd, setShowAdd] = useState(false);
  const handleAddClose = () => setShowAdd(false);
  const [showRemove, setShowRemove] = useState(false);
  const handleRemoveClose = () => setShowRemove(false);

  async function toggleRenamePrompt() {
    setShowRename((show) => !show);
  }
  async function toggleAddPrompt() {
    setShowAdd((show) => !show);
  }
  async function toggleRemovePrompt() {
    setShowRemove((show) => !show);
  }
  const handleShowTable = (key) => {
    setrowData(key);
    setShowModify(true);
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
    if (serviceTitle !== "") {
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
    <Container className="mt-4 mb-5 ">
      <Row className="justify-content-center ">
        <ListGroup className="w-100">
          {apiData.data
            .filter((serviceObj) => serviceObj.category === heading)
            .map((service, idx) => {
              return (
                <ListGroup.Item
                  key={idx}
                  eventKey={idx}
                  href={`#link ${idx}`}
                  onClick={() => setserviceTitle(service.title)}>
                  {service.title}
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Row>

      <Row className="mt-3 mb-3 justify-content-center" centered>
        <ButtonGroup>
          {serviceTitle !== "" && (
            <>
              <Button size="md" variant="info" onClick={toggleRenamePrompt}>
                Rename
              </Button>
              <Button size="md" variant="warning" onClick={toggleRemovePrompt}>
                Delete
              </Button>

              {/* <Row
            className="mb-3 justify-content-center"
            sm={2}
            xs={2}
            md={2}
            lg={2}>
            
          </Row> */}
            </>
          )}
        </ButtonGroup>
      </Row>
      <Modal centered show={showRename} onHide={handleCloseRename}>
        <RenameModal
          handleClose={handleCloseRename}
          type={"title"}
          name={serviceTitle}
        />
      </Modal>
      <Modal centered show={showAdd} onHide={handleAddClose}>
        <AddRemoveServiceModal handleClose={handleAddClose} type={"add"} />
      </Modal>
      <Modal centered show={showRemove} onHide={handleRemoveClose}>
        <AddRemoveServiceModal
          handleClose={handleRemoveClose}
          type={"remove"}
          data={{ service: serviceTitle, id: serviceID }}
        />
      </Modal>
      {serviceTitle !== "" && (
        <>
          <Row className="mt-5 justify-content-center">
            <Table
              style={{ position: "relative" }}
              className=" w-100"
              striped
              bordered
              hover>
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
                    <tr key={key} onClick={() => handleShowTable(key)}>
                      {/* <td key={key + "_1"}>{serviceTitle}</td> */}
                      <td key={key + "_2"}>${priceType.price}</td>
                      <td key={key + "_3"}>{priceType.serviceType}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
          <Modal
            centered
            show={showModify}
            onHide={handleCloseModify}
            animation={false}>
            <ModifyTableRowModal
              rowData={rowData}
              handleClose={handleCloseModify}
            />
          </Modal>

          <Row className="mt-3 justify-content-md-center">
            <Form className="w-100" onSubmit={handleSubmitOther}>
              <Form.Label> Other info</Form.Label>
              <InputGroup className=" mb-3">
                <Form.Control defaultValue={otherInfo} aria-label="Other" />
                <InputGroup.Append>
                  <Button variant="outline-primary" type="submit">
                    Save
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </Row>
        </>
      )}
    </Container>
  );
}
