const BASE = process.env.REACT_APP_API_BASE_URL;
const URL = {
  // AUTHENTICATION
  AUTH_LOGIN: BASE + "/web/session/authenticate", // Endpoint JSON-RPC của Odoo

  // API V1
  API_TEST: BASE + "/api/v1/test",

  // -- PARTNERS --
  API_PARTNERS: BASE + "/api/v1/partners",

  // -- TASKS --
  API_TASKS: BASE + "/api/v1/tasks",
  // Dùng hàm để tạo URL động cho các task có ID
  API_TASK_DETAIL: (id) => `/api/v1/tasks/${id}`,
};

export default URL;
