import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import cssClasses from "./NavDropDown.module.scss";

export default (props) => {
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <div
      className={cssClasses.NavLink}
      onMouseOver={() => {
        setShowDropDown(true);
      }}
      onMouseLeave={() => {
        setShowDropDown(false);
      }}
      onClick={() => {
        setShowDropDown(false);
      }}
    >
      <NavLink to={props.to} activeStyle={{ color: "#FACA0F" }}>
        {props.children}
       
      </NavLink>
      {showDropDown && (
          <div style={{ width: "200px", minHeight: "1px" }}>
            <li>
              {props.links.map((link, id) => {
                if (link.to) {
                  return (
                    <ul  key={id}>
                      <Link
                        to={link.to}
                        className={cssClasses.LinkClass}
                       
                      >
                        {link.title}
                      </Link>
                    </ul>
                  );
                } else {
                  return (
                    <ul  key={id}>
                      <button onClick={link.action}>{link.title}</button>
                    </ul>
                  );
                }
              })}
            </li>
          </div>
        )}
    </div>
  );
};
