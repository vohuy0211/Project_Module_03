import axios from "axios";
import axiosClient from "./axiosClient";

export class BookAPI {
  static getAllBook(data) {
    const url = "api/v1/book/getBook";
    return axiosClient.get(url, data);
  }
  static deleteId(id) {
    const url = `api/v1/book/deleteBook/${id}`;
    return axiosClient.delete(url, id);
  }
  static searchBook(searchTerm) {
    const url = `api/v1/book/searchBook/${searchTerm}`;
    return axiosClient.get(url);
  }
  static getBookById(id) {
    const url = `api/v1/book/getBook/${id}`;
    return axiosClient.get(url, id);
  }
  static updateBook(id, param) {
    const url = `api/v1/book/patchBook/${id}`;
    return axiosClient.patch(url, param);
  }
  static postBook(data) {
    const url = "api/v1/book/postBook";
    return axiosClient.post(url, data);
  }
  static getOder(data) {
    const url = "api/v1/history/getHistoryAll";
    return axiosClient.get(url, data);
  }
}
