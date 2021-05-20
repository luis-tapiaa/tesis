import React, { useRef } from "react";
import { useHistory, Link } from "react-router-dom";

import { Icon, IconButton } from "../../components";
import { useDropdown } from "./useDropdown";
import "./Dropdown.css";

const Dropdown = ({ children, text, icon = "caret-down", menu = [] }) => {
  const history = useHistory();
  const ref = useRef(null);
  const [active, toggleActive] = useDropdown(ref);

  const renderMenu = menu.map((m) => (
    <div
      className="dropdown-item"
      key={m.label}
      onClick={
        m.ref === "https://github.com/luis-tapiaa/circula"
          ? () => {
              window.open("https://github.com/luis-tapiaa/circula");
            }
          : () => {
              m.link ? history.push(m.link) : m.action();
              toggleActive();
            }
      }
    >
      {m.icon && <Icon size="15px" icon={m.icon} />}
      <span>{m.label}</span>
    </div>
  ));

  return (
    <div className="dropdown">
      {text && <div className="dropdown-text">{text}</div>}
      <IconButton {...{ icon }} className="dropdown-trigger" onClick={toggleActive} />
      <div ref={ref} className={`dropdown-menu ${active && "visible"}`}>
        {children}
        {renderMenu}
      </div>
    </div>
  );
};

export default Dropdown;
