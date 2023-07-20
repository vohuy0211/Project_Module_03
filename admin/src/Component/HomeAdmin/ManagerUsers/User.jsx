import React from "react";
import "./User.css";
import { useEffect } from "react";
import { AuthAPI } from "../../../api/user";
import { useState } from "react";
const User = () => {
  const [dataUser, setDataUser] = useState([]);
  const [isCall, setIsCall] = useState(true);

  useEffect(() => {
    const handleGetUser = async () => {
      // console.log(33333333);
      const response = await AuthAPI.getAllUsers();

      setDataUser(response.data.data);
    };
    if (isCall) {
      handleGetUser();
    }
    return () => {
      setIsCall(false);
    };
  }, [isCall]);
  // console.log(dataUser);

  const handleActive = async (userId, statusUser) => {
    const response = await AuthAPI.getUserById(userId);
    // console.log(response.data.data);
    const dataById = response.data.data;
    if (dataById.status === 1) {
      try {
        const newStatus = 2;
        await AuthAPI.editUser(userId, newStatus);

        setDataUser((prevData) =>
          prevData.map((user) =>
            user.id === userId ? { ...user, status: newStatus } : user
          )
        );
        console.log("loi tra ve la", dataUser);
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    } else {
      try {
        const newStatus = 1;
        await AuthAPI.editUser(userId, newStatus);

        setDataUser((prevData) =>
          prevData.map((user) =>
            user.id === userId ? { ...user, status: newStatus } : user
          )
        );
        console.log("loi tra ve la", dataUser);
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      if (searchTerm) {
        const response = await AuthAPI.searchUser(searchTerm);
        setDataUser(response.data.data);
      } else {
        setIsCall(!isCall); // Reload all users if search term is empty
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <div className="table-user">
      <div className="dashboard-content">
        <div className="dashboard-content-container">
          <div className="dashboard-content-header">
            <h2>User List</h2>
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
              <th>ROLE</th>
              <th>EMAIL</th>
              <th>USERNAME</th>
              <th>PHONE</th>
              <th>ACTION</th>
            </thead>
            <tbody>
              {dataUser.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span>{user.id}</span>
                  </td>
                  <td>
                    {user.role === 1 ? (
                      <span>User</span>
                    ) : user.role === 2 ? (
                      <span>Admin</span>
                    ) : null}
                  </td>
                  <td>
                    <div>{user.email}</div>
                  </td>
                  <td>
                    <div>
                      <span>{user.username}</span>
                    </div>
                  </td>
                  <td>
                    <span>{user.phoneNumber}</span>
                  </td>
                  <td>
                    {user.status === 1 ? (
                      <button onClick={() => handleActive(user.id)}>
                        Acticve
                      </button>
                    ) : user.status === 2 ? (
                      <button
                        onClick={() => handleActive(user.id)}
                        className="color"
                      >
                        Block
                      </button>
                    ) : (
                      ""
                    )}
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

export default User;
