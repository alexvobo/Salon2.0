import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useData, useDataUpdate } from "../contexts/DataContext";
export default function ModifyTableRowModal(props) {
  const { rowData, handleClose } = props;
  const toggleUpdate = useDataUpdate();
  const apiData = useData();

  let split = rowData.split("_");
  // const service = split[0];
  const price = split[1];
  let serviceType = split[2];
  const serviceID = split[3];

  async function handleRemove(e) {
    e.preventDefault();

    const uri =
      apiData.API_URL +
      `api/removePriceType/${process.env.REACT_APP_API_KEY}/${serviceID}/${price}/${serviceType}`;
    fetch(uri, { method: "PUT" })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        toggleUpdate();
      });

    handleClose();
  }
  // Make put request on save
  async function handleSave(e) {
    e.preventDefault();

    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    if (formDataObj.priceText !== price) {
      let newPrice = Number(formDataObj.priceText.replace("$", ""));
      const uri =
        apiData.API_URL +
        `api/updatePrice/${process.env.REACT_APP_API_KEY}/${serviceID}/${price}/${newPrice}`;

      fetch(uri, { method: "PUT" })
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
        });
    }

    if (formDataObj.serviceTypeText !== serviceType) {
      let newType = encodeURIComponent(formDataObj.serviceTypeText);
      let srvType = encodeURIComponent(serviceType);

      const uri = `api/updateType/${process.env.REACT_APP_API_KEY}/${serviceID}/${srvType}/${newType}`;

      fetch(uri, { method: "PUT" })
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
        });
    }
    toggleUpdate();
    handleClose();
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Edit Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSave}>
          <Form.Group id="servicePrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="priceText"
              defaultValue={price}
              type="text"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Service Type</Form.Label>
            <Form.Control
              name="serviceTypeText"
              type="text"
              defaultValue={serviceType}
            />
          </Form.Group>
          <div className="text-center">
            <Button className="w-50" variant="primary" type="submit">
              Save
            </Button>
            <Button className="w-50" variant="secondary" onClick={handleRemove}>
              Remove
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
}
