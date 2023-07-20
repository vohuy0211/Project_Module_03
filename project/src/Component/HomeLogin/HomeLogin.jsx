import React, { useEffect, useState } from "react";
import "./HomeLogin.css";
import asset from "../../assets/asses";
import { BsFire } from "react-icons/bs";
import { Link } from "react-router-dom";

import { bookAPI } from "../../api/book";
import { cartAPI } from "../../api/cart";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../apps/reducers/updateData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const HomeLogin = () => {
  const [book, setBook] = useState([]);
  const [selectBook, setSelectBook] = useState([]);
  const [isCheckBook, setIsCheckBook] = useState(false);
  const [isCall, setIsCall] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.search);
  useEffect(() => {
    const handleGetBook = async () => {
      if (searchValue == "") {
        const response = await bookAPI.getDataBook();
        const data = await response.data.data;
        // console.log(data);
        setBook(data);
      } else {
        const response = await cartAPI.searchBook(searchValue);
        const data = await response.data.data;
        // console.log(data);
        setBook(data);
      }
    };
    handleGetBook();

    return () => {
      setIsCall(false);
    };
  }, [isCall, searchValue]);

  const handleFilerType = (type) => {
    const newListBook = book.map((item) => {
      return {
        ...item,
        category:
          item.category.length > 1 ? item.category.split(",") : item.category,
      };
    });
    const test = newListBook.filter((item) =>
      item.category.some((t) => t.includes(type))
    );
    if (test.length != 0) {
      setIsCheckBook(true);
      setSelectBook(test);
    } else {
      setSelectBook([]);
    }
  };

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
    dispatch(updateState());
  };

  return (
    <div>
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
      <div className="Slider-product">
        <h2>
          Truyện HOT <BsFire />
        </h2>
        <div className="Slider-product-item">
          <img src={asset.productCard.anh1} />
          <img src={asset.productCard.anh2} />
          <img src={asset.productCard.anh3} />
          <img src={asset.productCard.anh4} />
          <img src={asset.productCard.anh5} />
          <img src={asset.productCard.anh6} />
        </div>
      </div>
      <div className="wrapper-product">
        <div className="wrapper-product-category">
          <h1>THỂ LOẠI</h1>
          <ul>
            <li onClick={() => handleFilerType("")}>TẤT CẢ</li>
            <li onClick={() => handleFilerType("viễn tưởng")}>VIỄN TƯỞNG</li>
            <li onClick={() => handleFilerType("xuyên không")}>XUYÊN KHÔNG</li>
            <li onClick={() => handleFilerType("tình cảm")}>TÌNH CẢM</li>
            <li onClick={() => handleFilerType("học đường")}>HỌC ĐƯỜNG</li>
            <li onClick={() => handleFilerType("cổ đại")}>CỔ ĐẠI</li>
            <li onClick={() => handleFilerType("thám hiểm")}>THÁM HIỂM</li>
            <li onClick={() => handleFilerType("linh dị")}>LINH DỊ</li>
          </ul>
        </div>
        <div className="wrapper-product-item">
          <div className="wrapper-product-card">
            <h1>ALL BOOK</h1>
            <div className="Card">
              {isCheckBook
                ? selectBook.length > 0 &&
                  selectBook?.map((item) => (
                    <div className="Card-Product" key={item.id}>
                      <img src={item.img} />
                      <h3>{item.nameBook}</h3>
                      <h5>
                        Giá sản phẩm :{item.price}
                        <span>đ</span>
                      </h5>
                      <div className="Card-Product-btn">
                        <Link to={`/Detail/${item.id}`}>Chi tiết</Link>
                        <button onClick={() => handleAddtoCart(item.id)}>
                          Thêm vào giỏ hàng
                        </button>
                      </div>
                    </div>
                  ))
                : book.length > 0 &&
                  book?.map((item) => (
                    <div className="Card-Product" key={item.id}>
                      <img src={item.img} />
                      <h3>{item.nameBook}</h3>
                      <h5>
                        Giá sản phẩm : {item.price.toLocaleString()}
                        <span>đ</span>
                      </h5>
                      <div className="Card-Product-btn">
                        <Link to={`/Detail/${item.id}`}>Chi tiết</Link>
                        <button onClick={() => handleAddtoCart(item.id)}>
                          Thêm vào giỏ hàng
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLogin;
