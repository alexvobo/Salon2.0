import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "../App.css";

import Login from "./Login";
import Dashboard from "./Dashboard";
import AppMain from "./AppMain";

function App() {
  useEffect(() => {
    // for DB, use fetch(), if connection successful that means we can update site with new info

    fetch("api/services")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setdata(data);
        setloading(0);
      });
  }, []);

  const [data, setdata] = useState({});
  const [loading, setloading] = useState(1);
  return (
    <div className=" PrimaryColor PrimaryFont">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <AppMain loading={loading} data={data} />
          </Route>
          {/* When user logs in successfully, bring them to edit menu page */}

          <Route path="/login" component={Login} />

          <Route exact path="/dashboard">
            <Dashboard loading={loading} data={data} />
          </Route>
          {/* Catch any invalid url */}
          <Route render={() => <Redirect to={{ pathname: "/" }} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
