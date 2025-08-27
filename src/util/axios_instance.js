import axios from "axios";

// Tạo một instance của Axios với các cấu hình mặc định
const axiosInstance = axios.create({
  // baseURL sẽ được tự động gắn vào đầu mỗi request
  baseURL: process.env.REACT_APP_API_BASE_URL,

  // withCredentials RẤT QUAN TRỌNG để tự động gửi và nhận cookie (session_id)
  withCredentials: true,
});

export default axiosInstance;
