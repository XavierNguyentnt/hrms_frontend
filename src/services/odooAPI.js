import axios_instance from "../util/axios_instance";
import URL from "../util/url";

// Cấu hình tên database của bạn
const ODOO_DB = process.env.REACT_APP_ODOO_DATABASE;

/**
 * Hàm gọi API để đăng nhập vào Odoo
 */
export const login = async (login, password) => {
  const params = { db: ODOO_DB, login, password };

  try {
    // Sử dụng axiosInstance và URL đã định nghĩa
    const response = await axios_instance.post(URL.AUTH_LOGIN, {
      jsonrpc: "2.0",
      params,
    });

    if (response.data.error) {
      throw new Error(
        response.data.error.data.message || "Sai tên đăng nhập hoặc mật khẩu."
      );
    }
    return response.data.result;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

/**
 * Hàm gọi API để lấy danh sách tasks
 */
export const fetchTasks = async () => {
  try {
    // Sử dụng axiosInstance và URL đã định nghĩa
    const response = await axios_instance.get(URL.API_TASKS);
    return response.data; // Trả về dữ liệu JSON
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
