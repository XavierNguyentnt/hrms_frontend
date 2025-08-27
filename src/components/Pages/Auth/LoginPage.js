import React, { useState } from "react";
import { login } from "../../../services/odooAPI"; // Import hàm login vừa tạo

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State để lưu thông báo lỗi
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    // Ngăn trình duyệt reload lại trang khi submit form
    event.preventDefault();

    setError(null); // Xóa lỗi cũ
    setIsLoading(true);

    try {
      // Gọi hàm login từ odooApi.js
      const sessionInfo = await login(email, password);

      // Nếu không có lỗi, gọi hàm callback báo đăng nhập thành công
      if (sessionInfo) {
        onLoginSuccess(sessionInfo);
      }
    } catch (err) {
      // Nếu có lỗi, cập nhật state error để hiển thị cho người dùng
      setError(err.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Hiển thị thông báo lỗi nếu có */}
        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
