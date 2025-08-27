import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TaskForm.css"; // Sẽ tạo file CSS sau

// Giả sử taskId được truyền vào qua props. Nếu không có là form tạo mới.
function TaskForm({ taskId }) {
  const [task, setTask] = useState({
    name: "",
    project_id: null,
    user_ids: [],
    date_deadline: "",
    description: "",
    priority: "0",
    tag_ids: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (taskId) {
      // Nếu là form edit, tải dữ liệu
      setLoading(true);
      axios
        .get(`/api/v1/tasks/${taskId}`)
        .then((response) => {
          const {
            name,
            project_id,
            user_ids,
            date_deadline,
            description,
            priority,
            tag_ids,
          } = response.data;
          setTask({
            name: name || "",
            project_id: project_id ? project_id[0] : null,
            user_ids: user_ids || [],
            date_deadline: date_deadline || "",
            description: description || "",
            priority: priority || "0",
            tag_ids: tag_ids || [],
          });
          setLoading(false);
        })
        .catch((err) => {
          setError("Could not fetch task data.");
          setLoading(false);
        });
    }
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiCall = taskId
      ? axios.put(`/api/v1/tasks/${taskId}`, task)
      : axios.post("/api/v1/tasks", task);

    apiCall
      .then((response) => {
        alert(taskId ? "Task Updated!" : "Task Created!");
      })
      .catch((err) => {
        setError("An error occurred while saving the task.");
        console.error(err);
      });
  };

  if (loading) return <p>Loading task details...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{taskId ? "Edit Task" : "Create New Task"}</h2>

      <div className="form-group">
        <label htmlFor="name">Title (name)</label>
        <input
          type="text"
          id="name"
          name="name"
          value={task.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority (priority)</label>
        <select
          id="priority"
          name="priority"
          value={task.priority}
          onChange={handleChange}>
          <option value="0">Low</option>
          <option value="1">High</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date_deadline">Deadline (date_deadline)</label>
        <input
          type="datetime-local"
          id="date_deadline"
          name="date_deadline"
          value={task.date_deadline}
          onChange={handleChange}
        />
      </div>

      {/* Các trường Many2one/Many2many sẽ cần component phức tạp hơn, tạm thời dùng input thường */}
      <div className="form-group">
        <label htmlFor="project_id">Project ID (project_id)</label>
        <input
          type="number"
          id="project_id"
          name="project_id"
          placeholder="Enter Project ID"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description (description)</label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          rows="5"></textarea>
      </div>

      <button type="submit" className="btn-primary">
        {taskId ? "Save Changes" : "Create Task"}
      </button>
    </form>
  );
}

export default TaskForm;
