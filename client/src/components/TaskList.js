import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchTasks, deleteTask } from '../redux/actions';
import AddTask from './AddTask';

const TaskList = ({ tasks, fetchTasks, deleteTask }) => {
  const [editTaskData, setEditTaskData] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);


  useEffect(() => {
    fetchTasks(); 
  }, [fetchTasks]);

  const handleEditTask = (task) => {
    setEditTaskData(task);
    setShowAddTaskModal(true);
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };

  const toggleAddTaskModal = () => {
    setShowAddTaskModal(!showAddTaskModal);
  };
  const statusOrder = ['Pending', 'Blocked', 'Doing', 'Done'];

  const sortedTasks = tasks.slice().sort((a, b) => {
    return statusOrder.indexOf(a.status.toLowerCase()) - statusOrder.indexOf(b.status.toLowerCase());
  });
  
  const groupedTasks = sortedTasks.reduce((acc, task) => {
    acc[task.status] = [...(acc[task.status] || []), task];
    return acc;
  }, {});

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Task Management</h1>
      {statusOrder.map(status => (
        <div key={status}>
          {groupedTasks[status] && groupedTasks[status].length > 0 && (
            <>
              <h2>{status}</h2>
              <ul className="list-group">
                {groupedTasks[status].map(task => (
                  <li key={task.id} className="list-group-item">
                    <strong>{task.title}</strong> - {task.description}
                    <button onClick={() => handleEditTask(task)}>Edit</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
      {editTaskData && showAddTaskModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Task</h5>
                <button
                  type="button"
                  className="close"
                  onClick={toggleAddTaskModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <AddTask onClose={toggleAddTaskModal} taskData={editTaskData} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  tasks: state.tasks.tasks 
});

const mapDispatchToProps = {
  fetchTasks,
  deleteTask
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
