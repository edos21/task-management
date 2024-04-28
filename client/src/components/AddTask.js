import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addTask, editTask } from "../redux/actions";

const AddTask = ({ addTask, editTask, taskData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");


  useEffect(() => {
    if (taskData) {
      setTitle(taskData.title || "");
      setDescription(taskData.description || "");
      setDueDate(taskData.due_date || "");
      setStatus(taskData.status || "pending");
    }
  }, [taskData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (taskData) {
        editTask(taskData.id, {
          title,
          description,
          due_date: dueDate,
          status
        });
      } else {
        addTask({
          title,
          description,
          due_date: dueDate,
          status
        });
      }

    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("pending");

  };

  return (
    <div className="add-task">
      <h2>{taskData ? "Edit Task" : "Add Task"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
        <button type="submit">{taskData ? "Save Changes" : "Add Task"}</button>
      </form>
    </div>
  );
};

export default connect(null, { addTask, editTask })(AddTask);