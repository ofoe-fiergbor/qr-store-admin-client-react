import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/action";

const Navbar = ({ user, logout }) => {
  const menuBar = user ? (
    <nav>
      <h1>
        <Link id="link" to="/">
          {user.username}
        </Link>
      </h1>
      <ul>
        <li>
          <Link id="link" to="/merchants">
            Your Merchants
          </Link>
        </li>
        <li>
          <Link id="link" to="/orders">
            Orders
          </Link>
        </li>

        <li id="link" onClick={logout}>
          Logout
        </li>
      </ul>
    </nav>
  ) : (
    <nav>
      <h1>
        <Link id="link" to="/">
          QR Store
        </Link>
      </h1>
      <ul>
        <li>
          <Link id="link" to="/register">
            Register
          </Link>
        </li>
        <li>
          <Link id="link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
  return menuBar;
};

function mstp(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mstp, { logout })(Navbar);
