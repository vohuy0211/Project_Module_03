import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

//câú hình bộ đón chặn
// Thêm một bộ đón chặn request
axiosClient.interceptors.request.use(
  function (config) {
    // Làm gì đó trước khi request dược gửi đi
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
axiosClient.interceptors.response.use(
  function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu respons
    return response;
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    console.log("loi tra ve la", error.response);
    const { data, config, status } = error.response;
    if (config.url === "api/v1/user/register" && status === 400) {
      throw new Error(data.msg);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
