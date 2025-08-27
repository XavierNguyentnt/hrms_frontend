import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom"; // Sẽ dùng sau
import axios from "axios";
import "./TaskList.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // BÂY GIỜ CHÚNG TA GỌI API THẬT
        const response = await axios.get("/api/v1/tasks");
        console.log("Data from API:", response.data);
        setTasks(response.data); // Cập nhật state với dữ liệu từ Odoo
      } catch (err) {
        setError(
          "Không thể tải dữ liệu. Vui lòng đăng nhập vào Odoo và làm mới trang."
        );
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  if (error) {
    return <div className="project-list-container error">{error}</div>;
  }

  // Hàm helper để render dữ liệu từ các trường quan hệ của Odoo
  const renderOdooField = (field) => {
    if (!field) return "—";
    // Dữ liệu quan hệ của Odoo thường có dạng [id, "display_name"]
    return field[1] || "—";
  };

  return (
    <div className="project-list-container">
      <div className="project-list-header">
        <h1>Tất cả nhiệm vụ</h1>
        <button className="btn-primary">Mới</button>
      </div>
      <div className="project-table-wrapper">
        <table className="project-table">
          <thead>
            {/* SẮP XẾP LẠI TIÊU ĐỀ THEO YÊU CẦU CỦA BẠN */}
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>ID</th>
              <th>Dự án</th>
              <th>Tiêu đề</th>
              <th>Thẻ</th>
              <th>Người quản lý</th>
              <th>Nhiệm vụ chính</th>
              <th>Người được phân công</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Thời hạn (Deadline)</th>
              <th>Thời gian được phân bổ</th>
              <th>Thời gian đã dùng</th>
              <th>Thời gian đã dùng cho nhiệm vụ phụ</th>
              <th>Tổng thời gian đã dùng</th>
              <th>Thời gian còn lại</th>
              <th>Tiến độ</th>
              <th>Hoạt động tiếp theo</th>
              <th>Thời hạn của tôi</th>
              <th>Cập nhật giai đoạn lần cuối</th>
              <th>Giai đoạn</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{task.id}</td>
                <td>{renderOdooField(task.project_id)}</td>
                <td>{task.name}</td>
                <td>{renderOdooField(task.tag_ids)}</td>
                <td>{renderOdooField(task.partner_id)}</td>
                <td>{renderOdooField(task.parent_id)}</td>
                {/* user_ids là dạng many2many, có thể có nhiều người */}
                <td>
                  {task.user_ids.map((user) => user[1]).join(", ") || "—"}
                </td>
                <td>{task.date_start || "—"}</td>
                <td>{task.date_stop || "—"}</td>
                <td>{task.date_deadline || "—"}</td>
                <td>{task.allocated_hours || 0}</td>
                <td>{task.total_hours_spent || 0}</td>
                <td>{task.subtask_effective_hours || 0}</td>
                <td>{task.total_hours_spent || 0}</td>
                <td>{task.remaining_hours || 0}</td>
                <td>{task.progress || 0}</td>
                <td>{renderOdooField(task.activity_ids)}</td>
                <td>{task.my_activity_date_deadline || "—"}</td>
                <td>{task.date_last_stage_update || "—"}</td>
                <td>{renderOdooField(task.stage_id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;
