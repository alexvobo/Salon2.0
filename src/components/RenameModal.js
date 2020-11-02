import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useDataUpdate } from "../contexts/DataContext";
const TITLE = "title";
const CATEGORY = "category";
export default function RenameModal(props) {
  const { handleClose, type, name } = props;
  const toggleUpdate = useDataUpdate();
  const [error, setError] = useState("");
  async function handleSave(e) {
    e.preventDefault();

    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    const newName = encodeURIComponent(formDataObj.renameText);
    setError("");

    if (newName) {
      let uri = "";

      if (type === CATEGORY) {
        uri = `api/updateCategory/${process.env.REACT_APP_API_KEY}/${name}/${newName}`;
      } else if (type === TITLE) {
        uri = `api/updateTitleByName/${process.env.REACT_APP_API_KEY}/${name}/${newName}`;
      }

      if (uri !== "") {
        try {
          fetch(uri, { method: "PUT" })
            .then((response) => response.json())
            .then((result) => {
              console.log("Success:", result);
              toggleUpdate();
            });
        } catch {
          setError(`Failed to update ${name} to ${newName}`);
        }
      }

      handleClose();
    }
  }
  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Modal.Header closeButton>
        <Modal.Title style={{ textTransform: "capitalize" }}>
          Rename {name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSave}>
          <Form.Group id="rename">
            <Form.Control
              name="renameText"
              type="text"
              defaultValue={name}
              placeholder={name}
              required
            />
          </Form.Group>

          <Button className="w-100" variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
