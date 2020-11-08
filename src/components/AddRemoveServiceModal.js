import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useData, useDataUpdate } from "../contexts/DataContext";

import "react-bootstrap-typeahead/css/Typeahead.css";

const ADD = "add";
const REMOVE = "remove";

export default function AddServiceModal(props) {
  const { handleClose, type, data } = props;
  const [selectedCategory, setSelectedCategory] = useState("");

  const toggleUpdate = useDataUpdate();
  const apiData = useData();

  async function handleSubmit(e) {
    e.preventDefault();

    let uri = "";
    console.log(selectedCategory);
    if (type === ADD) {
      const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries());

      let cat = selectedCategory[0].label
        ? selectedCategory[0].label
        : selectedCategory[0];

      if (cat) {
        const catEncode = encodeURIComponent(cat);
        const titleEncode = encodeURIComponent(formDataObj.serviceText);
        const priceEncode = encodeURIComponent(formDataObj.priceText);
        const typeEncode = encodeURIComponent(formDataObj.serviceTypeText);
        const otherEncode = encodeURIComponent(formDataObj.otherText);

        uri =
          apiData.API_URL +
          `api/createRecord/${process.env.REACT_APP_API_KEY}/${catEncode}/${titleEncode}/${priceEncode}/${typeEncode}/${otherEncode}`;
      }
    } else if (type === REMOVE) {
      uri =
        apiData.API_URL +
        `api/removeRecord/${process.env.REACT_APP_API_KEY}/${data.id}`;
    }

    if (uri !== "") {
      fetch(uri, { method: "PUT" })
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
          toggleUpdate();
        });
    }

    handleClose();
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title style={{ textTransform: "capitalize" }}>
          {type} Service
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {type === "add" ? (
            <>
              <Form.Group>
                <Form.Label>Category</Form.Label>

                <Typeahead
                  allowNew
                  id="selectCategory"
                  newSelectionPrefix="Add a new category: "
                  options={apiData.headings}
                  onChange={(s) => setSelectedCategory(s)}
                  placeholder="Type anything..."
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Service<span className="text-muted"> (e.g. Gloss)</span>
                </Form.Label>
                <Form.Control name="serviceText" type="text" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control name="priceText" type="text" required />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Service Type
                  <span className="text-muted"> (e.g. Short Hair)</span>
                </Form.Label>
                <Form.Control name="serviceTypeText" type="text" />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Other
                  <span className="text-muted"> (e.g. Includes styling)</span>
                </Form.Label>
                <Form.Control name="otherText" type="text" />
              </Form.Group>
              <div className="text-center">
                <Button
                  style={{ textTransform: "capitalize" }}
                  className="w-100"
                  variant="primary"
                  type="submit">
                  {type}
                </Button>
              </div>
            </>
          ) : (
            <>
              <h5 className="text-center">
                Are you sure you wish to remove all of
              </h5>
              <h5 className="text-center">
                <b>{data.service}?</b>
              </h5>
              <div className="text-center">
                <Button
                  style={{ textTransform: "capitalize" }}
                  className="mt-2 w-100"
                  variant="danger"
                  type="submit">
                  {type}
                </Button>
              </div>
            </>
          )}
        </Form>
      </Modal.Body>
    </>
  );
}
