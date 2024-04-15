import React from "react";
import style from "./header.module.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className={style.main}>
      <div className={style.header}>
        <Link className={style.register} to="/register">Create Account</Link>
      </div>
    </div>
  );
};

export default Header;
