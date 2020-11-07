import React, { useState, useContext, useEffect } from "react";
const API_URL = "https://american-beauty.herokuapp.com/"
// const API_URL = "";
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

  // Toggling this will trigger data refresh
  function toggleUpdate() {
    setDataLoaded((loaded) => !loaded);
  }
  // Fetch data from our API when dataLoaded is toggled
  useEffect(() => {
    console.log("triggered dataUpdate");

    fetch(API_URL + "api/services")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
      })
      .catch((error) => console.log(error));

    fetch(API_URL + "api/services/headings")
      .then((res) => res.json())
      .then((d) => {
        let result = d.map((o) => o._id);
        setHeadings(result);
      })
      .catch((error) => console.log(error));

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
