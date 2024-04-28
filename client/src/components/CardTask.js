import React from 'react';
import { connect } from 'react-redux';

import { deleteTask } from '../redux/actions';


const CardTask = ({ task, handleEditTask, deleteTask }) => {
    const handleDelete = (taskId) => {
        deleteTask(taskId);
    };
    
    const formattedDueDate = (dueDate) => {
        const date = new Date(dueDate);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

  return (
    <li key={task.id} className="list-group-item">
      <div>
        <strong>{task.title}</strong>
        <p>{task.description}</p>
        <p><i className="bi bi-calendar-date"></i> {formattedDueDate(task.due_date)}</p>
      </div>
      <div className="btn-group">
        <button className="btn btn-warning" onClick={() => handleEditTask(task)}><i className="bi bi-pencil-square"></i></button>
        <button className="btn btn-danger" onClick={() => handleDelete(task.id)}><i className="bi bi-trash-fill"></i></button>
      </div>
    </li>
  );
};

const mapStateToProps = state => ({
    tasks: state.tasks.tasks 
  });

const mapDispatchToProps = {
    deleteTask
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(CardTask);
