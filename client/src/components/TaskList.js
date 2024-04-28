import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../redux/actions';
import AddTask from './AddTask';
import CardTask from './CardTask';

import "../styles/TaskList.css";

const TaskList = ({ tasks, fetchTasks }) => {
  const [editTaskData, setEditTaskData] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  useEffect(() => {
    fetchTasks(); 
  }, [fetchTasks]);

  const handleEditTask = (task) => {
    setEditTaskData(task);
    setShowAddTaskModal(true);
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
      {statusOrder.map(status => (
        <div class="group-container" key={status}>
          {groupedTasks[status] && groupedTasks[status].length > 0 && (
            <>
              <h2>{status}</h2>
              <ul className="list-group">
                {groupedTasks[status].map(task => (
                  <CardTask
                  key={task.id}
                  task={task}
                  handleEditTask={handleEditTask}
                />
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
                  className="btn btn-link custom-link"
                  onClick={toggleAddTaskModal}
                >
                  X
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
  fetchTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
