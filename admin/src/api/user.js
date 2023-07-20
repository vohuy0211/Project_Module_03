import axios from "axios";
import axiosClient from "./axiosClient";

export class AuthAPI {
  static Login(data) {
    const url = "http://localhost:8080/api/v1/user/login";
    return axios.post(url, data);
  }
  static getAllUsers(data) {
    const url = "api/v1/user/get-user";
    return axiosClient.get(url, data);
  }
  static editUser(id, newStatus) {
    const url = `api/v1/user/patch-user-admin/${id}`;
    return axiosClient.patch(url, { status: newStatus });
  }
  static getUserById(id) {
    const url = `api/v1/user/get-user/${id}`;
    return axiosClient.get(url);
  }
  static searchUser(searchTerm) {
    const url = `api/v1/user/searchUser/${searchTerm}`;
    return axiosClient.get(url);
  }
}
