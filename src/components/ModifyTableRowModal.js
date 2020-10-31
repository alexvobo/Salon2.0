import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDataUpdate } from "../contexts/DataContext";
export default function ModifyTableRowModal(props) {
  const { rowData, handleClose } = props;
  const toggleUpdate = useDataUpdate();

  let split = rowData.split("_");
  // const service = split[0];
  const price = split[1];
  let serviceType = split[2];
  const serviceID = split[3];

  async function handleRemove(e) {
    e.preventDefault();

    const uri = `api/removePriceType/${serviceID}/${price}/${serviceType}`;
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
      const uri = `api/updatePrice/${serviceID}/${price}/${newPrice}`;

      fetch(uri, { method: "PUT" })
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
        });
    }

    if (formDataObj.serviceTypeText !== serviceType) {
      let newType = encodeURIComponent(formDataObj.serviceTypeText);
      serviceType = encodeURIComponent(serviceType);

      const uri = `api/updateType/${serviceID}/${serviceType}/${newType}`;

      fetch(uri, { method: "PUT" })
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
        });
    }

    handleClose();
    toggleUpdate();
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
            <Button variant="secondary" onClick={handleRemove} className="mr-3">
              Remove
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
}
