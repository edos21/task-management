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
      default:
        return state;
    }
  };
  
  export default tasksReducer;
  