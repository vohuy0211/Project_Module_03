import axios from "axios";
import axiosClient from "./axiosClient";

export class cartAPI {
  static addToCart(data) {
    const url = "api/v1/oderItem/postOderItem";
    return axiosClient.post(url, data);
  }
  static addOder(data) {
    const url = "api/v1/Oder";
    return axiosClient.post(url, data);
  }
  static getOder(id) {
    const url = `api/v1/Oder/${id}`;
    return axiosClient.get(url);
  }
  static getToCart(id) {
    const url = `api/v1/oderItem/${id}`;
    return axiosClient.get(url);
  }
  static updateCart(id, newQuantity) {
    const url = `api/v1/oderItem/${id}`;
    return axiosClient.patch(url, { quantity: newQuantity });
  }
  static deleteCart(id) {
    const url = `api/v1/oderItem/ById/${id}`;
    return axiosClient.delete(url, id);
  }
  static searchBook(searchTerm) {
    const url = `api/v1/book/searchBook/${searchTerm}`;
    return axiosClient.get(url);
  }
  static postHistory(data) {
    const url = "api/v1/history/postHistory";
    return axiosClient.post(url, data);
  }
  static DelOderItem(id) {
    const url = `api/v1/oderItem/${id}`;
    return axiosClient.delete(url);
  }
  static getHistory(id) {
    const url = `api/v1/history/getHistory/${id}`;
    console.log(url);
    return axiosClient.get(url);
  }
}
