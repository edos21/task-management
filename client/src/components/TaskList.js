import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchTasks, editTask, deleteTask } from '../redux/actions';
import AddTask from './AddTask';

const TaskList = ({ tasks, fetchTasks, editTask, deleteTask }) => {
  const [editTaskData, setEditTaskData] = useState(null);

  useEffect(() => {
    fetchTasks(); 
  }, [fetchTasks]);

  const handleEditTask = (task) => {
    setEditTaskData(task);
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Task Management</h1>
      <ul className="list-group">
        {tasks.map(task => (
          <li key={task.id} className="list-group-item">
            <strong>{task.title}</strong> - {task.description}
            <button onClick={() => handleEditTask(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editTaskData && <AddTask taskData={editTaskData} />}
    </div>
  );
};

const mapStateToProps = state => ({
  tasks: state.tasks.tasks 
});

const mapDispatchToProps = {
  fetchTasks,
  editTask,
  deleteTask
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
