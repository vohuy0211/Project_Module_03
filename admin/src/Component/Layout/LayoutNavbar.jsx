import React from "react";
import Navbar from "../HomeAdmin/Navbar/Navbar";
import "./LayoutAdmin.css";
const LayoutNavbar = ({ children }) => {
  return (
    <div className="Admin">
      <Navbar />
      {children}
    </div>
  );
};

export default LayoutNavbar;
