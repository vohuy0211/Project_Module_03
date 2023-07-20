import React, { useEffect, useState } from "react";
import "./History.css";
import { Link } from "react-router-dom";
import CartProduct from "./../CartProduct/CartProduct";
import { cartAPI } from "../../api/cart";

const History = () => {
  const [orderData, setOrderData] = useState([]);
  const userData = localStorage.getItem("user");
  const userObject = JSON.parse(userData);
  console.log("userObject", userObject);
  useEffect(() => {
    const fetchData = async (id) => {
      const response = await cartAPI.getHistory(userObject.id);
      console.log("dmjhsd,kfhsdk", response);
      setOrderData(response.data.data);
    };
    fetchData();
  }, []);
  console.log("hahahah", orderData);
  return (
    <div className="history-wrapper">
      <h2>Lịch sử mua hàng</h2>

      {orderData?.map((item) => (
        <div className="order-item">
          <div className="order-header">
            <div className="order-meta">
              Mã đơn hàng: | Ngày đặt hàng: {item.oderDate}
            </div>
            <div className="order-status"></div>
          </div>
          <div className="product-list">
            <div className="product-item">
              <img
                className="product-image"
                src={item.Book.img}
                alt="Product"
              />
              <div className="product-details">
                <div className="product-name">Số lượng : {item?.quantity}</div>
                <div className="product-price">
                  Giá:{item.Book.price.toLocaleString()} <span>đ</span>
                </div>
                <div className="product-price">
                  Tên sản phẩm:{item.Book.nameBook}
                </div>
              </div>
            </div>
          </div>
          <div className="action-buttons">
            <Link className="action-button primary-button" to="/Cart">
              Quay lại giỏ hàng
            </Link>
          </div>
          <div>
            <h6>
              Tình trạng : <h3>Đang giao</h3>
            </h6>
          </div>
        </div>
      ))}
      <div>Tổng tiền : {orderData?.totalPrice}</div>

      <div className="separator"></div>
      <div className="footer-section">
        <div>
          <a className="footer-link" href="#">
            Trợ giúp
          </a>
          <a className="footer-link" href="#">
            Điều khoản
          </a>
          <a className="footer-link" href="#">
            Bảo mật
          </a>
        </div>
        <div>
          <a className="footer-link" href="#">
            Shopee © 2023
          </a>
        </div>
      </div>
    </div>
  );
};

export default History;
