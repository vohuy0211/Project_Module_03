import axios from "axios";
import axiosClient from "./axiosClient";

export class AuthAPI {
  static registerData(data) {
    const url = "api/v1/user/register";
    return axiosClient.post(url, data);
  }
  static loginData(data) {
    const url = "http://localhost:8080/api/v1/user/login";
    return axios.post(url, data);
  }
  static getUser(id) {
    const url = `api/v1/user/get-user/${id}`;
    return axiosClient.get(url);
  }
}
