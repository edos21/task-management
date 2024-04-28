import React, { useState } from "react";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import "./styles/TaskApp.css";

export default function TaskApp() {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const toggleAddTaskModal = () => {
    setShowAddTaskModal(!showAddTaskModal);
  };

  return (
    <div className="task-app container-fluid">
      <h1 className="mb-3">Task Management</h1>
      <button className="btn btn-primary" onClick={toggleAddTaskModal}>
      <i class="bi bi-plus"></i> Add Task
      </button>
      <TaskList />
      {showAddTaskModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Task</h5>
                <button
                  type="button"
                  className="btn btn-link custom-link"
                  onClick={toggleAddTaskModal}
                >
                  X
                </button>
              </div>
              <div className="modal-body">
                <AddTask onClose={toggleAddTaskModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
