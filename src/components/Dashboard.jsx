import React, { useState, useEffect } from "react";

import { useAuth } from "../contexts/AuthContext";

import { useData, useDataUpdate } from "../contexts/DataContext";

import {
  Container,
  Dropdown,
  Spinner,
  Button,
  Alert,
  Modal,
} from "react-bootstrap";
import DashboardTable from "./DashboardTable";
import { useHistory } from "react-router-dom";
import RenamePrompt from "./RenamePrompt";

export default function Dashboard(props) {
  const [error, setError] = useState("");
  const [loadingTable, setloadingTable] = useState(true);
  const [selected, setselected] = useState("");
  const [showModal, setShowModal] = useState(false);
  const toggleUpdate = useDataUpdate();
  const history = useHistory();
  const apiData = useData();
  const { logout } = useAuth();
  // Keeps track of when we need to refresh api data
  // Handles rename prompt
  const [showRename, setShowRename] = useState(false);
  const handleCloseRename = () => setShowRename(false);
  const handleShowRename = () => setShowRename(true);
  //
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
          <h1>Hi Lana,</h1>
          {/* Query DB for headings, make them selectable */}
          <div>
            <Dropdown
              as="ButtonGroup"
              className="m-4"
              styles={{ fontSize: "24px" }}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
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

            {!loadingTable && (
              <Button size="sm" onClick={toggleRenamePrompt}>
                Rename
              </Button>
            )}

            <Modal show={showRename} onHide={handleCloseRename}>
              <RenamePrompt
                handleClose={handleCloseRename}
                type={"category"}
                name={selected}
              />
            </Modal>

            {!loadingTable && (
              <DashboardTable heading={selected} data={apiData.data} />
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
