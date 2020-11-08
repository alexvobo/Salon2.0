import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

require("dotenv").config();

import { AuthProvider } from "../contexts/AuthContext";
import { DataProvider } from "../contexts/DataContext";

import Login from "./Login";
import Dashboard from "./Dashboard";
import MainSite from "./MainSite";
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
                <MainSite />
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
