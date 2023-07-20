import React, { useEffect, useState } from "react";
import "./Login.css";
import asset from "../../assets/asses";
import { CiFacebook } from "react-icons/ci";
import { FiTwitter } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../apps/reducers/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({});
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: inputValue.email,
        password: inputValue.password,
      };
      // console.log("dữ liệu===>", payload);
      const response = await dispatch(handleLogin(payload)).unwrap();
      // localStorage.setItem("userLogin", JSON.stringify(response));
      // console.log(response);
      // console.log("login", response.data.data);
      const checkUser = response.data.data;
      if (checkUser.status === 1) {
        toast.success("Logged in successfully", {
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
          navigate("/HomeLogin"); // Chuyển đến trang đăng nhập
        }, 5000);
      } else {
        toast.error("Tài khoản bạn đã bị khoá", {
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
    } catch (error) {
      // console.log(error.message);
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
      <form onSubmit={handleSubmit}>
        <h3>Đăng nhập vào Wattpad</h3>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Đăng nhập</button>
        <div className="Register-Login">
          <div>Bạn chưa có tài khoản ?</div>
          <div className="Register">
            <h4>
              <Link to="/Register">Đăng ký</Link>
            </h4>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
