import React, { useRef, useState, useEffect } from "react";

import { useAuth } from "../contexts/AuthContext";

import { useData } from "../contexts/DataContext";

import { Container, Dropdown, Spinner, Button, Alert } from "react-bootstrap";
import DashboardTable from "./DashboardTable";
import { useHistory } from "react-router-dom";

export default function Dashboard(props) {
  const [error, setError] = useState("");
  const [loadingTable, setloadingTable] = useState(1);
  const [selected, setselected] = useState("");

  const history = useHistory();
  const apiData = useData();
  const { logout } = useAuth();
  // Keeps track of when we need to refresh api data

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
    if (selected != "") setloadingTable(0);
  }, [selected]);

  //^ vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  //* NEED TO MAKE SURE WE CHECK IF USER LOGGED IN TO DISPLAY DASHBOARD
  //* NEED TO TRIGGER DATA UPDATE IF WE CHANGE ANY OF THE PARAMETERS
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
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
          <Dropdown className="m-4" styles={{ fontSize: "24px" }}>
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
            <DashboardTable heading={selected} data={apiData.data} />
          )}
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </Container>
      )}
    </>
  );
}
