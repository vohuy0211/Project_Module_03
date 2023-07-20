import React, { useEffect, useState } from "react";
import asset from "../../assets/asses";
import "./Detail.css";
import { bookAPI } from "../../api/book";
import { useParams } from "react-router-dom";
import { cartAPI } from "../../api/cart"; // 1. Import cartAPI
import { useDispatch } from "react-redux"; // 1. Import useDispatch
import { updateState } from "../../apps/reducers/updateData"; // 1. Import updateState
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Detail = () => {
  const { id } = useParams();
  const [idBook, setIdBook] = useState(null);
  const dispatch = useDispatch(); // 1. Sử dụng useDispatch

  useEffect(() => {
    bookAPI.getBookId(id).then((data) => {
      console.log("Đúng chưa con chó", data.data.data);
      const dataDetails = data.data.data;
      setIdBook(dataDetails);
    });
  }, [id]);

  const categoryArr = idBook?.category.split(",");
  console.log(categoryArr);

  const handleAddtoCart = async (id) => {
    const userOrder = JSON.parse(localStorage.getItem("user"));
    const valueOrder = { user_id: userOrder.id };
    console.log("user==>", valueOrder);

    await cartAPI.addOder(valueOrder);

    await cartAPI.getOder(userOrder.id).then((oder) => {
      console.log(oder.data.oder[0].id);
      let dataValue = {
        quantity: 1,
        book_id: id,
        oders_id: oder.data.oder[0].id,
      };
      console.log("dataValue", dataValue);
      cartAPI.addToCart(dataValue);
      toast.success("Thêm vào giỏ hàng thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
    dispatch(updateState()); // 1. Dispatch action để cập nhật lại trạng thái Redux
  };

  return (
    <div className="wrapper-Detail-card">
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
      <h1>Thông tin truyện</h1>
      <div className="wrapper-Detail">
        <div>
          <h1>THỂ LOẠI</h1>
          <ul>
            {categoryArr?.map((item) => (
              <li className="categoryItem" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <img src={idBook?.img} />
        </div>
        <div className="Detail-card">
          <h3>{idBook?.nameBook}</h3>
          <h4>
            Giá : {idBook?.price.toLocaleString()}
            <span>đ</span>
          </h4>
          <p>
            Số lượng <input type="number" />
          </p>
          <h5>Giới thiệu :{idBook?.description}</h5>
          <h5>Số lượng còn lại : {idBook?.quantity}</h5>
          <h5>Tác giả : {idBook?.author}</h5>
          <button onClick={() => handleAddtoCart(idBook?.id)}>
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
