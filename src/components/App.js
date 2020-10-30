import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { AuthProvider } from "../contexts/AuthContext";
import { DataProvider } from "../contexts/DataContext";

import Login from "./Login";
import Dashboard from "./Dashboard";
import AppMain from "./AppMain";
import PrivateRoute from "./PrivateRoute";

import "../App.css";

function App() {
  return (
    <div className=" PrimaryColor PrimaryFont">
      <DataProvider>
        <BrowserRouter>
          <AuthProvider>
            <Switch>
              <Route exact path="/">
                <AppMain/>
              </Route>
              <Route path="/login" component={Login} />
              <PrivateRoute
                exact
                path="/dashboard"
                component={Dashboard}></PrivateRoute>
              <Route render={() => <Redirect to={{ pathname: "/" }} />} />
            </Switch>
          </AuthProvider>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
