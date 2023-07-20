import axios from "axios";
import axiosClient from "./axiosClient";

export class bookAPI {
  static getDataBook(data) {
    const url = "api/v1/book/getBook";
    return axiosClient.get(url, data);
  }
  static getBookId(id) {
    const url = `api/v1/book/getBook/${id}`;
    console.log("Đường dẫn", url);
    return axiosClient.get(url, id);
  }
}
