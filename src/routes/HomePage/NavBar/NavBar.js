import React from "react";
import { Link } from "react-router-dom";

import { Dropdown } from "../../../smart-components";
import { useNavBar } from "./useNavBar";
import "./NavBar.css";

const NavBar = () => {
  const { foto, menu, nav, usuario } = useNavBar();

  const renderNav = nav.map((n) => (
    <Link key={n} to={`/${n}`}>
      {n}
    </Link>
  ));

  const renderMenu = (
    <>
      <div className="nav-menu">
        <img src={foto} alt="profile" />
        <span>{`${usuario.a_paterno}, ${usuario.nombre}`}</span>
        <Dropdown menu={menu} />
      </div>
    </>
  );

  return (
    <header>
      <div>
        <Link to="/">
          <img
            src="https://luis-tapiaa.github.io/icons-host/icons/logo.png"
            alt="logo"
            className="nav-logo"
          />
        </Link>
      </div>
      <nav className="nav-list">{renderNav}</nav>
      {renderMenu}
    </header>
  );
};

export default NavBar;
