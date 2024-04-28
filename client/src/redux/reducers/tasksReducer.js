const initialState = {
  tasks: [],
  loading: false,
  error: null
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TASKS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_TASKS_SUCCESS':
      return { ...state, tasks: action.payload, loading: false };
    case 'FETCH_TASKS_FAILURE':
      return { ...state, error: action.payload, loading: false };
    case 'DELETE_TASK_REQUEST':
      return { ...state, loading: true };
    case 'DELETE_TASK_SUCCESS':
      // Remove the deleted task from the tasks array
      const updatedTasks = state.tasks.filter(task => task.id !== action.payload);
      return { ...state, tasks: updatedTasks, loading: false };
    case 'DELETE_TASK_FAILURE':
      return { ...state, error: action.payload, loading: false };
    case 'EDIT_TASK_REQUEST':
      return { ...state, loading: true };
    case 'EDIT_TASK_SUCCESS':
      // Update the task in the tasks array with the edited data
      const editedTasks = state.tasks.map(task => {
        if (task.id === action.payload.taskId) {
          return { ...task, ...action.payload.updatedTaskData };
        }
        return task;
      });
      return { ...state, tasks: editedTasks, loading: false };
    case 'EDIT_TASK_FAILURE':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default tasksReducer;
