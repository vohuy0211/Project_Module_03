import React, { useEffect, useState } from "react";
import "./Register.css";
import asset from "../../assets/asses";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../apps/reducers/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({});
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    if (e.target.name === "confirmPassword") {
      if (e.target.value === inputValue.password) {
        setErrors({});
      }
    }
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  // validate

  // Cập nhật trạng thái lỗi

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!inputValue.username) {
      newErrors.username = "Vui lòng nhập tên người dùng";
    }
    if (!inputValue.phoneNumber) {
      newErrors.phoneNumber = "Vui lòng nhập số điện thoại";
    }
    if (!inputValue.address) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }
    if (!inputValue.email) {
      newErrors.email = "Vui lòng nhập email";
    }
    // Kiểm tra các trường input khác
    if (!inputValue.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }
    if (!inputValue.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    }
    // Kiểm tra trùng khớp mật khẩu
    if (inputValue.password !== inputValue.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không trùng nhau";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { confirmPassword, ...payload } = inputValue;
      await dispatch(registerUser(payload)).unwrap();
      toast.success("Register in successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/Login"); // Chuyển đến trang đăng nhập
      }, 5000);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <form onSubmit={handleSubmit} method="POST">
        <h3>Tham gia Wattpad</h3>
        <p>
          Là một phần của cộng đồng tác giả và độc giả toàn cầu, mọi người đều
          được kết nối bằng sức mạnh của truyện đọc.
        </p>
        <div className="form-group">
          <label>Username:</label>
          <input type="name" name="username" onChange={handleInputChange} />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number :</label>
          <input
            type="number"
            name="phoneNumber"
            onChange={handleInputChange}
          />
          {errors.phoneNumber && (
            <span className="error">{errors.phoneNumber}</span>
          )}
        </div>
        <div className="form-group">
          <label>Address :</label>
          <input type="text" name="address" onChange={handleInputChange} />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" onChange={handleInputChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Mật khẩu:</label>
          <input type="password" name="password" onChange={handleInputChange} />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label>Nhập lại mật khẩu</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleInputChange}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>
        <button type="submit">Đăng ký</button>
        <div className="Register-Login-1">
          <div>Bạn đã có tài khoản ?</div>
          <div className="Register">
            <h4>
              <Link to="/Login">Đăng nhập</Link>
            </h4>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
