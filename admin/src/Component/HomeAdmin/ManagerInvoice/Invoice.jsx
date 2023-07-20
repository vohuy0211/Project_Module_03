import React, { useEffect, useState } from "react";
import { BookAPI } from "../../../api/book";

const Invoice = () => {
  const [dataOder, setDataOder] = useState([]);
  const [isCall, setIsCall] = useState(true);
  useEffect(() => {
    const handleGetAllOder = async () => {
      const response = await BookAPI.getOder();
      console.log(response);
      setDataOder(response.data.data);
    };
    handleGetAllOder();
  }, [isCall]);
  console.log(dataOder);
  return (
    <div className="table-user">
      <div className="dashboard-content">
        <div className="dashboard-content-container">
          <div className="dashboard-content-header">
            <h2>Invoice List</h2>
            <div className="dashboard-content-search">
              <input
                type="text"
                placeholder="Search.."
                className="dashboard-content-input"
              />
            </div>
          </div>

          <table>
            <thead>
              <th>ID</th>
              <th>Order Date</th>
              <th>USERNAME</th>
              <th>PRICE</th>
              <th>PHONE</th>
              <th>ACTION</th>
            </thead>
            <tbody>
              {dataOder?.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span>{item.id}</span>
                  </td>
                  <td>
                    <span>{item.oderDate}</span>
                  </td>
                  <td>
                    <div>{item.oder.User.username}</div>
                  </td>
                  <td>
                    <div>
                      <span>{item.totalPrice.toLocaleString()} đ</span>
                    </div>
                  </td>
                  <td>
                    <span>{item.oder.User.phoneNumber}</span>
                  </td>
                  <td>
                    <button>{item.status}</button>
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

export default Invoice;
