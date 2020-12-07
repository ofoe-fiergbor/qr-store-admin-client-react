import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AuthRoute from "./AuthRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Navbar from "../components/Navbar";
import Merchants from "../pages/Merchants";
import SingleMerchant from "../pages/SingleMerchant";
import AddMerchant from "../pages/AddMerchant";

function Root({ user }) {
  return (
    <Router>
      <Navbar />

      <Route path="/" exact component={Home} />
      <Route path="/merchants" exact component={Merchants} />
      <Route path="/merchants/:id" exact component={SingleMerchant} />
      <Route path="/addMerchant" exact component={AddMerchant} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
    </Router>
  );
}

export default Root;
