import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useData, useDataUpdate } from "../contexts/DataContext";
export default function AddService(props) {
  const { handleClose, type, category } = props;
  const toggleUpdate = useDataUpdate();

  // Make put request on save
  async function handleAdd(e) {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    if (formDataObj.serviceText && formDataObj.priceText) {
      let catEncode = encodeURIComponent(category);
      let titleEncode = encodeURIComponent(formDataObj.serviceText);
      let priceEncode = encodeURIComponent(formDataObj.priceText);
      let typeEncode = encodeURIComponent(formDataObj.serviceTypeText);
      let otherEncode = encodeURIComponent(formDataObj.otherText);
      //Need to add category dropdown
      const uri = `api/createRecord/${catEncode}/${titleEncode}/${priceEncode}/${typeEncode}/${otherEncode}`;

      fetch(uri, { method: "PUT" })
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
          toggleUpdate();
        });

      handleClose();
    }
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title style={{ textTransform: "capitalize" }}>
          {type} Service
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAdd}>
          <Form.Group id="service">
            <Form.Label>Service</Form.Label>
            <Form.Control name="serviceText" type="text" />
          </Form.Group>
          <Form.Group id="servicePrice">
            <Form.Label>Price</Form.Label>
            <Form.Control name="priceText" type="text" />
          </Form.Group>

          <Form.Group id="serviceType">
            <Form.Label>Service Type</Form.Label>
            <Form.Control name="serviceTypeText" type="text" />
          </Form.Group>
          <Form.Group id="other">
            <Form.Label>Other</Form.Label>
            <Form.Control name="otherText" type="text" />
          </Form.Group>
          <div className="text-center">
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
