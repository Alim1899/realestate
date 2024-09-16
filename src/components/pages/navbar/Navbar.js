import React from "react";
import classes from "./Navbar.module.css";
import logo from "../../../assets/logo.svg";
const Navbar = () => {
  return (
    <div className={classes.main}>
      <a href="/">
       
        <img className={classes.logo} src={logo} alt="Logo"></img>
      </a>
    </div>
  );
};

export default Navbar;
