import React, { useEffect, useState } from "react";
import Header from "../common/Header/Header";
import "./Profile.css";
import asset from "../../assets/asses";
import { AuthAPI } from "../../api/auth";
const Profile = () => {
  return (
    <div className="container">
      <Header />
      <div className="wrapper-profile">
        <h1>Hồ sơ của bạn</h1>
        <form>
          <div className="wrapper-form-profile">
            <div>
              <h3>Ảnh đại diện</h3>
              <img src={asset.productCard.anh6} />
              <br></br>
              <input type="file" />
            </div>
            <div>
              <label>Username :</label>
              <input type="text" />
              <label>Email :</label>
              <input type="email" />
              <label>Phone :</label>
              <input type="text" />
            </div>
            <button>Cập nhật</button>
          </div>
        </form>
      </div>
      <div className="wrapper-footer-end">
        <div className="wrapper-footer-end-right">
          <h5>Truyện Tính phí</h5>
          <h5>Thử dùng gói Cao cấp</h5>
          <h5>Tải Ứng Dụng</h5>
          <h5>Ngôn ngữ</h5>
          <h5>Các tác giả</h5>
          <h5>Kinh Doanh</h5>
          <h5>Công việc</h5>
          <h5>Báo chí</h5>
        </div>
        <div className="wrapper-footer-end-left">
          <h5>Điều khoản </h5>
          <h5>Bảo mật</h5>
          <h5>Thiết lập</h5>
          <h5>Trợ giúp</h5>
        </div>
      </div>
    </div>
  );
};

export default Profile;
