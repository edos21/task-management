import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../redux/actions';

const TaskList = ({ tasks, fetchTasks }) => {
  useEffect(() => {
    fetchTasks(); 
  }, [fetchTasks]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Task List</h2>
      <ul className="list-group">
        {tasks.map(task => (
          <li key={task.id} className="list-group-item">
            <strong>{task.title}</strong> - {task.description}
          </li>
        ))}
      </ul>
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
