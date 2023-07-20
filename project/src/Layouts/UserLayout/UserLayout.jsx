import React from "react";
import Header from "../../Component/common/Header/Header";
import Footer from "../../Component/common/Footer/Footer";

const UserLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default UserLayout;
