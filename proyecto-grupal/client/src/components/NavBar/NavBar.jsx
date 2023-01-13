import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import s from "../Home/Home.module.css";


export default function NavBar() {
  return (
    <div className={style.navbar}>
      <div>
        <Link to={"/createProduct"}>
          <button className={s.btns}>Create Product</button>
        </Link>
        <Link to={"/administrateUsers"}>
          <button className={s.btns}>Users Dashboard</button>
        </Link>
        <Link to={"/administrateOrders"}>
          <button className={s.btns}>Orders Dashboard</button>
        </Link>
      </div>
    </div>
  );
}
