import React, { useEffect, useState } from "react";
import Header from "../common/Header/Header";
import "./CartProduct.css";
import { TiDelete } from "react-icons/ti";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import asset from "../../assets/asses";
import { cartAPI } from "../../api/cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartProduct = () => {
  const [dataOrder, setDataOrder] = useState();
  const [isCall, setIsCall] = useState(true);
  const [stateUpdate, setStateUpdate] = useState();
  const userData = localStorage.getItem("user");
  const userObject = JSON.parse(userData);

  useEffect(() => {
    const handleGetCart = async (id) => {
      // console.log("id", id);
      const response = await cartAPI.getToCart(id);
      // console.log("response", response.data.data);
      const data = response.data.data;
      // console.log("data cart ==>", data);
      setDataOrder(data);
    };
    if (isCall) {
      handleGetCart(userObject.id);
    }
    return () => {
      setIsCall(false);
    };
  }, [isCall]);
  // console.log("dataOder ===> ", dataOrder);

  const getTotalPrice = () => {
    return dataOrder?.reduce(
      (total, item) => total + item.Book.price * item.quantity,
      0
    );
  };

  const handleIncreaseQuantity = async (productId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    await updateQuantityOnServer(productId, newQuantity);
  };

  const handleDecreaseQuantity = async (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      await updateQuantityOnServer(productId, newQuantity);
    }
  };

  const updateQuantityOnServer = async (productId, newQuantity) => {
    console.log("vao day");
    try {
      await cartAPI.updateCart(productId, newQuantity);
      // Cập nhật lại dữ liệu hiển thị sau khi thay đổi số lượng thành công trên server
      setDataOrder((prevData) =>
        prevData.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await cartAPI.deleteCart(id);
      setDataOrder((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleHistory = async (id) => {
    const dataUserOder = await cartAPI.getOder(id);
    // console.log("hahahaha==>", dataUserOder.data.oder[0]?.id);
    const dateResponse = await cartAPI.getToCart(id);
    // console.log("a hoàng 3đ", dateResponse);
    const dataOrder = dateResponse.data.data;
    await dataOrder?.map((item) => {
      return cartAPI.postHistory({
        totalPrice: Number(getTotalPrice()),
        oderDate: new Date().toISOString(),
        oders_id: dataUserOder.data.oder[0]?.id,
        books_id: item.book_id,
        quantity: Number(item.quantity),
        status: "1",
      });
    });
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
    // console.log("hahaha");
    await cartAPI
      .DelOderItem(dataUserOder.data.oder[0]?.id)
      .then((res) => {
        console.log("delete thanh cong");
      })
      .catch((err) => {
        console.log("err", err);
      });
    setDataOrder();
  };

  return (
    <div className="wrapper-cart-product">
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
      <Header />
      <h2>
        <i>Danh sách sản phẩm</i>
      </h2>
      <div className="wrapper-cart">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Hình ảnh</th>
              <th>Tên</th>
              <th>Giá sản phẩm</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataOrder?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <img src={item.Book.img} />
                </td>
                <td>{item.Book.nameBook}</td>
                <td>
                  {(item.Book.price * item.quantity).toLocaleString()}
                  <span>đ</span>
                </td>
                <td className="quantity">
                  <AiOutlineMinus
                    onClick={() =>
                      handleDecreaseQuantity(item.id, item.quantity)
                    }
                  />
                  <span>{item.quantity}</span>
                  <AiOutlinePlus
                    onClick={() =>
                      handleIncreaseQuantity(item.id, item.quantity)
                    }
                  />
                </td>
                <td>
                  <TiDelete onClick={() => handleDelete(item.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pay-cart">
          <h3>Đơn hàng</h3>
          <div>
            Tổng({dataOrder?.length} sản phẩm) :{" "}
            {getTotalPrice()?.toLocaleString()}đ
          </div>
          <button onClick={() => handleHistory(userObject.id)}>
            Thanh toán
          </button>
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
    </div>
  );
};

export default CartProduct;
