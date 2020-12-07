import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/action";

const Navbar = ({ user, logout }) => {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menu = user ? (
    <Menu pointing secondary color="pink" size="large">
      <Menu.Item
        name={user.username}
        as={Link}
        to="/"
        onClick={handleItemClick}
      />
      <Menu.Item
        name="your merchants"
        as={Link}
        to="/merchants"
        active={activeItem === "merchants"}
        onClick={handleItemClick}
      />
      <Menu.Item
        name="orders"
        as={Link}
        to="/orders"
        active={activeItem === "orders"}
        onClick={handleItemClick}
      />

      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={() => logout()} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary color="pink" size="large">
      <Menu.Item name="QR Shop" />

      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          as={Link}
          to="/login"
          active={activeItem === "login"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="register"
          as={Link}
          to="/register"
          active={activeItem === "register"}
          onClick={handleItemClick}
        />
      </Menu.Menu>
    </Menu>
  );
  return menu;
};
function mstp(state) {
  // console.log(state.auth.user);
  return {
    user: state.auth.user,
  };
}
export default connect(mstp, { logout })(Navbar);
