import React, { useEffect, useState } from "react";
import asset from "../../../assets/asses";
import "./Header.css";
import { BiSearchAlt2 } from "react-icons/bi";
import { GrCart } from "react-icons/gr";
import { Link } from "react-router-dom";
import { cartAPI } from "../../../api/cart";
import { useDispatch, useSelector } from "react-redux";
import { handleSearch } from "../../../apps/reducers/searchSlice";
import { AiOutlineSetting } from "react-icons/ai";

const Header = () => {
  const userData = localStorage.getItem("user");
  const userObject = JSON.parse(userData);
  const [dataOrder, setDataOrder] = useState();
  const update = useSelector((state) => state.update);
  const [isCall, setIsCall] = useState(true);
  const [updateCart, setUpdateCart] = useState(0);
  const dispatch = useDispatch();
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const handleGetCart = async (id) => {
    console.log(id);
    try {
      const response = await cartAPI.getToCart(id);
      // console.log("response", response.data.data);
      const data = response.data.data;
      setDataOrder(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    handleGetCart(userObject?.id);
  }, [update]);

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    window.location.href = "/login";
  };

  const handleAddtoCart = () => {
    setUpdateCart(dataOrder?.length);
  };
  useEffect(() => {
    handleAddtoCart();
  }, [dataOrder]);

  const handleSearchValue = (e) => {
    dispatch(handleSearch(e.target.value));
  };
  const handleToggleSetting = () => {
    setIsSettingOpen((prev) => !prev);
  };

  // console.log("dữ liệu", dataOrder);
  return (
    <div className="wrapper-header">
      <div className="wrapper-header-left">
        <div className="header-logo">
          {userObject ? (
            <Link to="/HomeLogin">
              <img src={asset.logo} />
            </Link>
          ) : (
            <Link to="/">
              <img src={asset.logo} />
            </Link>
          )}
        </div>
        <div className="header-navbar">
          <ul>
            <a>Khám phá</a>
            <li>Cộng đồng</li>
            <li className="header-search">
              <BiSearchAlt2 />
              <input
                type="text"
                placeholder="Tìm kiếm"
                onChange={(e) => handleSearchValue(e)}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="wrapper-header-right">
        <div>
          {userObject ? (
            <Link>Xin chào !!! {userObject.username} </Link>
          ) : (
            <Link to="/Login">Đăng nhập </Link>
          )}
        </div>
        <div className="icon-cart">
          <Link to="/Cart">
            <GrCart />
          </Link>
          <div className="count">{dataOrder?.length}</div>
          {userObject ? <button onClick={handleLogout}>Đăng xuất</button> : ""}
        </div>
        <div className="settings">
          <AiOutlineSetting onClick={handleToggleSetting} />
          {isSettingOpen && (
            <div className="settings-dropdown">
              <ul>
                <li>
                  <Link to="/Profile">Hồ sơ của tôi</Link>
                </li>
                <li>
                  <Link to="/History">Lịch sử giao hàng</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
