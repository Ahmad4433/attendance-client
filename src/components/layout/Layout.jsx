import React from "react";
import style from "./layout.module.css";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
const Layout = () => {
  return (
    <div className={style.main}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
