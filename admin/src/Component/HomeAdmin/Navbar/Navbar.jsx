import React from "react";
import "./Navbar.css";
import { BiUserCircle } from "react-icons/bi";
import { RiProductHuntFill } from "react-icons/ri";
import { LuBookCopy } from "react-icons/lu";
import { AiOutlinePoweroff } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <div className="wrapper-navbar">
      <ul className="wrapper-navbar-item">
        <div>
          <h2>BookStore</h2>
        </div>
        <li>
          <BiUserCircle />
          <Link to="/Navbar"> Quản lí người dùng</Link>
        </li>
        <li>
          <RiProductHuntFill />
          <Link to="/Product"> Quản lí sản phẩm</Link>
        </li>
        <li>
          <LuBookCopy />
          <Link to="/Invoice"> Quản lí hoá đơn</Link>
        </li>
      </ul>
      <div className="Navbar-Logout ">
        <div className="logout" onClick={handleLogout}>
          Log out
        </div>
        <div className="iconLogout">
          <AiOutlinePoweroff />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
