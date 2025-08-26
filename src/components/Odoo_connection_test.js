import React, { useState, useEffect } from "react";
import axios from "axios";

function OdooConnectionTest() {
  // Dùng useState để lưu trữ tin nhắn từ API
  const [message, setMessage] = useState("Loading...");

  // Dùng useEffect để gọi API một lần khi component được render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/test");
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching data from Odoo:", error);
        setMessage("Failed to connect to Odoo API");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>React - Odoo Connection Test</h1>
      <p>
        Message from Odoo Backend: <strong>{message}</strong>
      </p>
    </div>
  );
}

export default OdooConnectionTest;
