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
import RenamePrompt from "./RenamePrompt";
import AddRemoveService from "./AddRemoveService";

import { useData, useDataUpdate } from "../contexts/DataContext";

export default function DashboardTable(props) {
  const { heading, data } = props;

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
  async function toggleModify() {
    setShowModify((show) => !show);
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
      <Dropdown as="ButtonGroup" className="m-4" styles={{ fontSize: "24px" }}>
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
      <Button
        variant="primary"
        size="sm"
        className=" "
        active
        onClick={toggleAddPrompt}>
        Add
      </Button>
      {serviceTitle !== "" && (
        <>
          <Button size="sm" onClick={toggleRenamePrompt}>
            Rename
          </Button>
          <Button
            variant="secondary"
            size="sm "
            className=" "
            active
            onClick={toggleRemovePrompt}>
            Remove
          </Button>
        </>
      )}

      <Modal show={showRename} onHide={handleCloseRename}>
        <RenamePrompt
          handleClose={handleCloseRename}
          type={"title"}
          name={serviceTitle}
        />
      </Modal>

      <Modal show={showAdd} onHide={handleAddClose}>
        <AddRemoveService
          handleClose={handleAddClose}
          type={"add"}
          data={{ category: heading }}
        />
      </Modal>

      <Modal show={showRemove} onHide={handleRemoveClose}>
        <AddRemoveService
          handleClose={handleRemoveClose}
          type={"remove"}
          data={{ service: serviceTitle, id: serviceID }}
        />
      </Modal>
      {serviceTitle != "" && (
        <>
          <Table className="mt-3" striped bordered hover>
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

          <Modal show={showModify} onHide={handleCloseModify} animation={false}>
            <ModifyTableRow
              data={data}
              rowData={rowData}
              handleClose={handleCloseModify}
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
