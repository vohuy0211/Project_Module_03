import React, { Children } from "react";
import Header from "../../Component/common/Header/Header";

const LayoutCard = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default LayoutCard;
