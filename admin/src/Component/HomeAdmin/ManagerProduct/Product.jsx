import React, { useEffect } from "react";
import "./Product.css";
import { useState } from "react";

import { BookAPI } from "../../../api/book";
import axiosClient from "../../../api/axiosClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Product = () => {
  const [dataBook, setDataBook] = useState([]);
  const [isCall, setIsCall] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [showAddBook, setShowAddBook] = useState(false);

  console.log("data Edit", dataEdit);

  const handleGetAllBook = async () => {
    try {
      const response = await BookAPI.getAllBook();
      // console.log("setDATA", response.data.data);
      setDataBook(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (isDataFetched) {
      // Only fetch data if it's not already fetched
      handleGetAllBook();
    }
    return () => {
      setIsDataFetched(false);
    };
  }, [isDataFetched]);

  const handleDelete = async (id) => {
    // console.log("id nè ", id);
    try {
      await BookAPI.deleteId(id);
      setDataBook((preveData) => preveData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      if (searchTerm) {
        const response = await BookAPI.searchBook(searchTerm);
        console.log(response.data.data);
        const data = response.data.data;
        setDataBook(data);
      } else {
        setIsDataFetched(true);
      }
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  const handleEdit = async (id) => {
    setShowModal(true);
    const response = await BookAPI.getBookById(id);
    console.log(response.data.data);
    const data = response.data.data;
    setDataEdit(data);
  };

  //handle onChangeEdit
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDataEdit((prevDataEdit) => ({
      ...prevDataEdit,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleModalAddBook = () => {
    setShowAddBook(true);
  };

  const handleCloseModalBook = () => {
    setShowAddBook(false);
  };
  // console.log("modal", showModal);

  //xu ly viec upload anh de lay duong dan
  const handleImageChange = (e) => {
    //lấy ra đường dẫn ảnh khi click
    const file = e.target.files[0];
    //call api lên server để lấy về đường dẫn dạng localhost:8080//images/...
    axiosClient({
      method: "POST",
      url: "api/v1/image",
      data: {
        editImage: file,
      },
      headers: {
        "Content-Type": "multipart/form-data; ",
      },
    })
      .then((res) => {
        console.log(res.data.data.image);
        setDataEdit({ ...dataEdit, img: res.data.data.image });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(dataEdit.id, dataEdit);
    try {
      const response = await BookAPI.updateBook(dataEdit.id, dataEdit);
      // setIsDataFetched(true);
      handleGetAllBook();
      console.log(response);
      setShowModal(false);
      toast.success("Cập nhật thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      setShowModal(false);
      console.error("Error updating book data:", error);
    }
  };

  const handleOnChangeValue = (e) => {
    const { name, value } = e.target;
    setDataEdit({
      ...dataEdit,
      [name]: value,
    });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      console.log(dataEdit);
      const response = await BookAPI.postBook(dataEdit);
      handleGetAllBook();
      setShowAddBook(false);
      toast.success("Thêm sản phẩm thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      setShowAddBook(false);
      console.error("Error updating book data:", error);
    }
  };
  // console.log(dataEdit);
  return (
    <div className="table-user">
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
      <div className="dashboard-content">
        <div className="dashboard-content-container">
          <div className="dashboard-content-header">
            <h2>Product List</h2>
            <button className="addBook" onClick={handleModalAddBook}>
              Add products
            </button>
            {showAddBook && (
              <>
                <div className="modals-book">
                  <div className="modal-content-book">
                    <form onSubmit={handleAddBook}>
                      <div>
                        <label htmlFor="image">Hình ảnh:</label>
                        <input
                          type="file"
                          name="image"
                          onChange={handleImageChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="productName">Tên sản phẩm:</label>
                        <input
                          type="text"
                          name="nameBook"
                          onChange={handleOnChangeValue}
                        />
                      </div>
                      <div>
                        <label htmlFor="productName">Tác giả:</label>
                        <input
                          type="text"
                          name="author"
                          onChange={handleOnChangeValue}
                        />
                      </div>
                      <div>
                        <label htmlFor="price">Giá sản phẩm:</label>
                        <input
                          type="text"
                          name="price"
                          onChange={handleOnChangeValue}
                        />
                      </div>
                      <div>
                        <label htmlFor="stock">Hàng tồn kho:</label>
                        <input
                          type="text"
                          name="quantity"
                          onChange={handleOnChangeValue}
                        />
                      </div>
                      <div>
                        <label htmlFor="category">Thể loại:</label>
                        <input
                          type="text"
                          name="category"
                          onChange={handleOnChangeValue}
                        />
                      </div>
                      <div>
                        <label htmlFor="category">Nội dung :</label>
                        <input
                          type="text"
                          name="description"
                          onChange={handleOnChangeValue}
                        />
                      </div>
                      <div className="btn-update">
                        <button className="button-update" type="submit">
                          Add product
                        </button>
                        <button
                          className="button-cancel"
                          onClick={handleCloseModalBook}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}
            <div className="dashboard-content-search">
              <input
                type="text"
                placeholder="Search.."
                className="dashboard-content-input"
                onInput={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>

          <table>
            <thead>
              <th>ID</th>
              <th>HÌNH ẢNH</th>
              <th>TÊN SẢN PHẨM</th>
              <th>GIÁ SẢN PHẨM</th>
              <th>TỒN KHO</th>
              <th>CATOGERY</th>
              <th>ACTION</th>
            </thead>
            <tbody>
              {dataBook.map((product) => (
                <tr key={product.id}>
                  <td>
                    <span>{product.id}</span>
                  </td>
                  <td className="img-book">
                    <img src={product.img} />
                  </td>
                  <td>
                    <div>{product.nameBook}</div>
                  </td>
                  <td>
                    <div>
                      <span>{product.price.toLocaleString()}đ</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span>{product.quantity}</span>
                    </div>
                  </td>
                  <td>
                    <span>{product.category}</span>
                  </td>
                  <td>
                    <button
                      className="button-edit"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </button>
                    {showModal && (
                      <>
                        <div className="modals">
                          <div
                            className="modal-content"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <img
                              src={dataEdit?.img}
                              style={{ width: "100px", height: "100px" }}
                            />
                            <form onSubmit={handleSubmit}>
                              <div>
                                <input
                                  type="file"
                                  name="image"
                                  onChange={handleImageChange}
                                />
                              </div>
                              <div>
                                <label htmlFor="productName">
                                  Tên sản phẩm:
                                </label>
                                <input
                                  type="text"
                                  name="nameBook"
                                  value={dataEdit.nameBook}
                                  onChange={handleOnChange}
                                />
                              </div>
                              <div>
                                <label htmlFor="price">Giá sản phẩm:</label>
                                <input
                                  type="text"
                                  name="price"
                                  value={dataEdit.price}
                                  onChange={handleOnChange}
                                />
                              </div>
                              <div>
                                <label htmlFor="stock">Hàng tồn kho:</label>
                                <input
                                  type="text"
                                  name="quantity"
                                  value={dataEdit.quantity}
                                  onChange={handleOnChange}
                                />
                              </div>
                              <div>
                                <label htmlFor="category">Thể loại:</label>
                                <input
                                  type="text"
                                  name="category"
                                  value={dataEdit.category}
                                  onChange={handleOnChange}
                                />
                              </div>
                              <div className="btn-update">
                                <button className="button-update" type="submit">
                                  Update
                                </button>
                                <button
                                  className="button-cancel"
                                  onClick={handleCloseModal}
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </>
                    )}
                    <button
                      className="button-delete"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Product;
