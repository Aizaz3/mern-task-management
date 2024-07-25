const initialState = {
  tasks: [],
  loading: true,
  error: null
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TASKS_SUCCESS':
      return {
        ...state,
        tasks: action.payload,
        loading: false
      };
    case 'CREATE_TASK_SUCCESS':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case 'UPDATE_TASK_SUCCESS':
      return {
        ...state,
        tasks: state.tasks.map(task => task._id === action.payload._id ? action.payload : task)
      };
    case 'DELETE_TASK_SUCCESS':
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      };
    case 'FETCH_TASKS_FAIL':
    case 'CREATE_TASK_FAIL':
    case 'UPDATE_TASK_FAIL':
    case 'DELETE_TASK_FAIL':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default taskReducer;
