import React, { useState, useEffect } from "react";
import {
  Container,
  Dropdown,
  Spinner,
  Button,
  Alert,
  Modal,
  ButtonGroup,
} from "react-bootstrap";

import { useAuth } from "../contexts/AuthContext";
import { useData, useDataUpdate } from "../contexts/DataContext";

import DashboardTable from "./DashboardTable";
import { useHistory } from "react-router-dom";
import RenameModal from "./RenameModal";
import AddRemoveServiceModal from "./AddRemoveServiceModal";

export default function Dashboard(props) {
  const [error, setError] = useState("");
  const [loadingTable, setloadingTable] = useState(true);
  const [selected, setselected] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const handleAddClose = () => setShowAdd(false);
  async function toggleAddPrompt() {
    setShowAdd((show) => !show);
  }
  // const [showModal, setShowModal] = useState(false);
  // const toggleUpdate = useDataUpdate();
  const history = useHistory();
  const apiData = useData();
  const { logout, hours, username } = useAuth();

  const [showRename, setShowRename] = useState(false);
  const handleCloseRename = () => setShowRename(false);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  useEffect(() => {
    // When selected changes, query to fill up the table
    if (selected !== "") setloadingTable(false);
  }, [selected]);

  async function toggleRenamePrompt() {
    setShowRename((show) => !show);
  }
  return (
    <>
      {/* Make sure the data from DB is loaded */}
      {apiData.loading ? (
        <div
          className="d-flex align-items-center justify-content-center "
          style={{ minHeight: "100vh" }}>
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <Container className="p-5  mt-4 blackbox DashBoardFont">
          {error && <Alert variant="danger">{error}</Alert>}

          <h2>
            {hours < 12
              ? `Good morning ${username}`
              : hours < 18
              ? `Good afternoon ${username}`
              : `Good evening ${username}`}
          </h2>
          {/* Query DB for headings, make them selectable */}
          <div className="text-center">
            <Dropdown
              as={ButtonGroup}
              className="m-4"
              size="lg"
              styles={{ fontSize: "24px" }}>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {selected || "Categories"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {apiData.headings.map((head, idx) => {
                  return (
                    <Dropdown.Item key={idx} onSelect={() => setselected(head)}>
                      {head}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            <ButtonGroup>
              <Button size="md" variant="success" onClick={toggleAddPrompt}>
                Add Service
              </Button>
              {!loadingTable && (
                <Button size="md" variant="info" onClick={toggleRenamePrompt}>
                  Rename
                </Button>
              )}
            </ButtonGroup>
            <Modal centered show={showAdd} onHide={handleAddClose}>
              <AddRemoveServiceModal
                handleClose={handleAddClose}
                type={"add"}
              />
            </Modal>
            <Modal centered show={showRename} onHide={handleCloseRename}>
              <RenameModal
                handleClose={handleCloseRename}
                type={"category"}
                name={selected}
              />
            </Modal>

            {!loadingTable && (
              <>
                <hr />
                <DashboardTable heading={selected} />
              </>
            )}
          </div>
          <Button
            className="float-right"
            variant="danger"
            onClick={handleLogout}>
            Log Out
          </Button>
        </Container>
      )}
    </>
  );
}
