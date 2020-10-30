import React from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useDataUpdate } from "../contexts/DataContext";

export default function RenamePrompt(props) {
  const { handleClose, type, name } = props;
  const toggleUpdate = useDataUpdate();
  //   const [error, setError] = useState("");
  async function handleSave(e) {
    e.preventDefault();

    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    const newName = encodeURIComponent(formDataObj.renameText);
    if (newName) {
      //   setError("");
      let uri = "";
      if (type === "category") {
        uri = `api/updateCategory/${name}/${newName}`;
      } else if (type === "title") {
        uri = `api/updateTitleByName/${name}/${newName}`;
      }

      if (uri !== "") {
        try {
          fetch(uri, { method: "PUT" })
            .then((response) => response.json())
            .then((result) => {
              console.log("Success:", result);
            });
          toggleUpdate();
        } catch {
          // setError("Failed to update" + newName);
        }
      }

      handleClose();
    }
  }
  return (
    <>
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
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Form>
      </Modal.Body>

      <Modal.Footer></Modal.Footer>
    </>
  );
}
