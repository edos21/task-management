import axios from 'axios';

// Action types for fetching tasks
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

// Action types for adding tasks
export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

// Action types for deleting and editing tasks
export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';

export const EDIT_TASK_REQUEST = 'EDIT_TASK_REQUEST';
export const EDIT_TASK_SUCCESS = 'EDIT_TASK_SUCCESS';
export const EDIT_TASK_FAILURE = 'EDIT_TASK_FAILURE';

// Action creators for fetching tasks
export const fetchTasksRequest = () => ({
  type: FETCH_TASKS_REQUEST
});

export const fetchTasksSuccess = (tasks) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks
});

export const fetchTasksFailure = (error) => ({
  type: FETCH_TASKS_FAILURE,
  payload: error
});

// Action creators for adding tasks
export const addTaskRequest = () => ({
  type: ADD_TASK_REQUEST
});

export const addTaskSuccess = (task) => ({
  type: ADD_TASK_SUCCESS,
  payload: task
});

export const addTaskFailure = (error) => ({
  type: ADD_TASK_FAILURE,
  payload: error
});

// Action creators for deleting tasks
export const deleteTaskRequest = () => ({
    type: DELETE_TASK_REQUEST
  });
  
  export const deleteTaskSuccess = (taskId) => ({
    type: DELETE_TASK_SUCCESS,
    payload: taskId
  });
  
  export const deleteTaskFailure = (error) => ({
    type: DELETE_TASK_FAILURE,
    payload: error
  });
  
  // Action creators for editing tasks
  export const editTaskRequest = () => ({
    type: EDIT_TASK_REQUEST
  });
  
  export const editTaskSuccess = (taskId) => ({
    type: EDIT_TASK_SUCCESS,
    payload: taskId
  });
  
  export const editTaskFailure = (error) => ({
    type: EDIT_TASK_FAILURE,
    payload: error
  });

// Async action creators
export const fetchTasks = () => {
  return (dispatch) => {
    dispatch(fetchTasksRequest());
    axios.get('/tasks')
      .then(response => {
        dispatch(fetchTasksSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchTasksFailure(error.message));
      });
  };
};

export const addTask = (taskData) => {
  return (dispatch) => {
    dispatch(addTaskRequest());
    axios.post('/tasks', taskData)
      .then(response => {
        dispatch(addTaskSuccess(response.data));
        dispatch(fetchTasks());
      })
      .catch(error => {
        dispatch(addTaskFailure(error.message));
      });
  };
};

export const deleteTask = (taskId) => {
    return (dispatch) => {
      dispatch(deleteTaskRequest());
      axios.delete(`/tasks/${taskId}`)
        .then(() => {
          dispatch(deleteTaskSuccess(taskId));
          dispatch(fetchTasks());
        })
        .catch(error => {
          dispatch(deleteTaskFailure(error.message));
        });
    };
  };

  export const editTask = (taskId, updatedTaskData) => {
    return (dispatch) => {
      dispatch(editTaskRequest());
      axios.put(`/tasks/${taskId}`, updatedTaskData)
        .then(() => {
          dispatch(editTaskSuccess(taskId));
          dispatch(fetchTasks());
        })
        .catch(error => {
          dispatch(editTaskFailure(error.message));
        });
    };
  };
