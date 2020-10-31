import React, { useState, useContext, useEffect } from "react";

const DataContext = React.createContext();
const DataUpdateContext = React.createContext();
export function useData() {
  return useContext(DataContext);
}
export function useDataUpdate() {
  return useContext(DataUpdateContext);
}
export function DataProvider({ children }) {
  //States that will be accessed in this context
  const [data, setData] = useState([]);
  const [headings, setHeadings] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [hour, setHour] = useState(0);

  // Toggling this will trigger data refresh
  function toggleUpdate() {
    setDataLoaded((loaded) => !loaded);
  }
  // Fetch data from our API when dataLoaded is toggled
  useEffect(() => {
    console.log("triggered dataUpdate");
    fetch("api/services")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
      });
    fetch("api/services/headings")
      .then((res) => res.json())
      .then((d) => {
        let result = d.map((o) => o._id);
        setHeadings(result);
      });

    if (data && headings) {
      setDataLoaded(true);
    }
  }, [dataLoaded]);

  const value = { data: data, headings: headings, loaded: dataLoaded };

  return (
    <DataContext.Provider value={value}>
      <DataUpdateContext.Provider value={toggleUpdate}>
        {dataLoaded && children}
      </DataUpdateContext.Provider>
    </DataContext.Provider>
  );
}
