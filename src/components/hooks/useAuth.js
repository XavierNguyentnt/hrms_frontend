import { useState } from "react";
import { login } from "../../services/odooAPI";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const sessionInfo = await login(email, password);
      return sessionInfo;
    } catch (err) {
      setError(err.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, error };
};
