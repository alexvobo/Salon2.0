import React, { useRef, useState, useEffect } from "react";

import { Container, Dropdown, Spinner } from "react-bootstrap";
import DashboardTable from "./DashboardTable";

export default function Dashboard(props) {
  const { data, loading } = props;
  const [loadingTable, setloadingTable] = useState(1);
  const [selected, setselected] = useState("");
  const userRef = useRef();
  const passwordRef = useRef();
  useEffect(() => {
    // When selected changes, query to fill up the table
    if (selected != "") setloadingTable(0);
  }, [selected]);
  return (
    <>
      {/* Make sure the data from DB is loaded */}
      {loading ? (
        <div
          className="d-flex align-items-center justify-content-center "
          style={{ minHeight: "100vh" }}>
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <Container className="p-5  mt-4 blackbox DashBoardFont">
          <h1>Hello Lana,</h1>
          {/* Query DB for headings, make them selectable */}
          <Dropdown className="m-4" styles={{ fontSize: "24px" }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {selected || "Categories"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {data.map((serviceObj, idx) => {
                const heading = serviceObj.category;
                return (
                  <Dropdown.Item
                    key={idx}
                    onSelect={() => setselected(heading)}>
                    {heading}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          {!loadingTable && <DashboardTable heading={selected} data={data} />}
        </Container>
      )}
    </>
  );
}
