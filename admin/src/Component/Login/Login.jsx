import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleLogin } from "../../reducer/reducer/UserSlice";
function Login() {
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
      console.log("dữ liệu===>", payload);
      const response = await dispatch(handleLogin(payload)).unwrap();
      console.log("LOGIN", response.data.data.role);
      const checkUser = response.data.data.role;
      if (checkUser == 2) {
        toast.success("Hello ADMIN", {
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
          navigate("/Navbar");
        }, 2000);
      } else {
        toast.error("Lỗi", {
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
    <MDBContainer className="my-5 gradient-form">
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
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img
                src="data:image/jpeg;base64,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"
                style={{ width: "185px" }}
                alt="logo"
              />
              <h4 className="mt-1 mb-5 pb-1">Welcom ADMIN</h4>
            </div>

            <p>Please login to your account</p>

            <form onSubmit={handleSubmit}>
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                name="email"
                id="form1"
                type="email"
                onChange={handleInputChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                type="password"
                name="password"
                onChange={handleInputChange}
              />

              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit">
                  Sign in
                </MDBBtn>

                <a className="text-muted" href="#!">
                  Forgot password?
                </a>
              </div>
            </form>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <MDBBtn outline className="mx-2" color="danger">
                Danger
              </MDBBtn>
            </div>
          </div>
        </MDBCol>

        <MDBCol col="6" className="mb-5 text">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 class="mb-4">
                Hello! Welcome to our online reading website!
              </h4>
              <p class="small mb-0">
                We are delighted to introduce you to an amazing online reading
                experience. Our website offers a vast collection of literary
                works, ranging from mysterious stories and captivating novels to
                heartwarming romance tales. Whether you prefer any genre, we are
                confident that you will find intriguing pieces that perfectly
                match your entertainment needs right here.
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
