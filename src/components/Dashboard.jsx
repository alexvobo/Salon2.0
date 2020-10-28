import React, { useRef, useState, useEffect, useContext } from "react";
import dataChangedContext from "../contexts/dataChangedContext";

import { Container, Dropdown, Spinner } from "react-bootstrap";
import DashboardTable from "./DashboardTable";

export default function Dashboard(props) {
  const [data, setdata] = useState({});
  const [headings, setheadings] = useState([]);
  const [loading, setloading] = useState(1);
  const [loadingTable, setloadingTable] = useState(1);
  const [selected, setselected] = useState("");
  const userRef = useRef();
  const passwordRef = useRef();
  // Keeps track of when we need to refresh api data

  let dataChanged = useContext(dataChangedContext);

  useEffect(() => {
    // setloading(1);
    console.log("triggered")
    fetch("api/services")
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
      });
    fetch("api/services/headings")
      .then((res) => res.json())
      .then((data) => {
        let result = data.map((o) => o._id);
        setheadings(result);
      });

    if (data && headings) {
      setloading(0);
      dataChanged = 0;
    }
  }, [dataChanged]);
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
              {headings.map((head, idx) => {
                return (
                  <Dropdown.Item key={idx} onSelect={() => setselected(head)}>
                    {head}
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
