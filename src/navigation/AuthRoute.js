import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function AuthRoute({ user, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

const mstp = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mstp)(AuthRoute);
