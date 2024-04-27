import axios from 'axios';

// Action types
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

// Action creators
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
  