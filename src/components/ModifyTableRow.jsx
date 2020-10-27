import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
export default function ModifyTableRow(props) {
  const { data, rowData, handleClose } = props;
  let split = rowData.split("_");
  const service = split[0];
  const price = split[1];
  const serviceType = split[2];
  const [update, setUpdate] = useState({});
  // Make put request on save
  async function handleSave(e) {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    if (formDataObj.serviceText) {
      setUpdate({ ...update, service: formDataObj.serviceText });
    }
    if (formDataObj.priceText) {
      let newstate = {};
      setUpdate({ ...update, price: formDataObj.priceText });
    }
    if (formDataObj.serviceTypeText) {
      setUpdate({ ...update, serviceType: formDataObj.serviceTypeText });
    }
    console.log(update);

    handleClose();
    // await login(userRef.current.value, passwordRef.current.value);
    // setLoading(false);
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Edit Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSave}>
          <Form.Group id="service">
            <Form.Label>Service</Form.Label>
            <Form.Control
              name="serviceText"
              type="text"
              placeholder={service}
            />
          </Form.Group>
          <Form.Group id="servicePrice">
            <Form.Label>Price</Form.Label>
            <Form.Control name="priceText" type="text" placeholder={price} />
          </Form.Group>
          {serviceType != "" && (
            <Form.Group id="serviceType">
              <Form.Label>Service Type</Form.Label>
              <Form.Control
                name="serviceTypeText"
                type="text"
                placeholder={serviceType}
              />
            </Form.Group>
          )}
          <div className="text-center">
            <Button variant="secondary" type="submit">
              Save
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Remove
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
}
