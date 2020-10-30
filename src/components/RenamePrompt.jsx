import React from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useDataUpdate } from "../contexts/DataContext";

export default function RenamePrompt(props) {
  const { handleClose, category } = props;
  const toggleUpdate = useDataUpdate();
//   const [error, setError] = useState("");
  async function handleSave(e) {
    e.preventDefault();

    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    const newCat = encodeURIComponent(formDataObj.categoryText);
    if (newCat) {
    //   setError("");
      try {
        const uri = `api/updateCategory/${category}/${newCat}`;
        fetch(uri, { method: "PUT" })
          .then((response) => response.json())
          .then((result) => {
            console.log("Success:", result);
          });
        toggleUpdate();
      } catch {
        // setError("Failed to update" + category);
      }

      handleClose();
    }
  }
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Rename Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSave}>
          <Form.Group id="renameCategory">
            <Form.Control
              name="categoryText"
              type="text"
              defaultValue={category}
              placeholder={category}
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
