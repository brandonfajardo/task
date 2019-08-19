import {
    CREATE_TASK,
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAIL,
    FETCH_TASK,
    FETCH_TASK_FAIL,
    FETCH_TASK_SUCCESS,
    CLEAR_CREATE_TASK_MODAL,
    UPDATE_TASK,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAIL,
    DELETE_TASK,
    CLEAR_EDIT_TASK_MODAL
} from "../actions/types";
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'

    const initialState = {
        creatingTask: null,
        createTaskSuccessMessage: null,
        createTaskFailMessage: null,
        loadingTask: null,
        tasks: [],
        updatingTask: null,
        updateTaskSuccessMessage: null,
        updateTaskFailMessage: null,
    }
  
  export default (state = initialState, action) => {
    switch(action.type){
        case FETCH_TASK:
            return {
                ...state,
                loadingTask: true,
            }
        case FETCH_TASK_FAIL:
            return {
                ...state,
                loadingTask: null,
                loadTaskFailMessage: action.payload,
            }
        case FETCH_TASK_SUCCESS:
            return {
                ...state,
                loadingTask: null,
                tasks: action.payload,
            }
        case CREATE_TASK:
            return {
                ...state,
                creatingTask: true,
                createTaskSuccessMessage: null,
                createTaskFailMessage: null,
            }
        case CREATE_TASK_SUCCESS:
            const { data } = action.payload
            const updatedTasks = [...state.tasks, {
                _id: data._id,
                email: data.email,
                priority: data.priority,
                description: data.description,
            }]

            return {
                ...state,
                createTaskSuccessMessage: action.payload.message,
                creatingTask: null,
                tasks: updatedTasks,
            }
        case CREATE_TASK_FAIL:
            return {
                ...state,
                createTaskFailMessage: action.payload,
                creatingTask: null,
            }
        case CLEAR_CREATE_TASK_MODAL: 
            return {
                ...state,
                createTaskFailMessage: null,
                createTaskSuccessMessage: null,
            }
        case UPDATE_TASK: 
            return {
                ...state,
                updatingTask: true,
            }
        case UPDATE_TASK_SUCCESS:
            const taskId = get(action.payload, 'data.id')
            const priority = get(action.payload, 'data.priority')
            const description = get(action.payload, 'data.description')
            const message = get(action.payload, 'message')

            const updatedTask = state.tasks.map(task => {
                if (isEqual(task._id, taskId)) {
                    return {
                        ...task,
                        priority,
                        description,
                    }
                }
                return task
            })

            return {
                ...state,
                updatingTask: null,
                updateTaskSuccessMessage: message,
                tasks: updatedTask,
            }
        case UPDATE_TASK_FAIL:
            return {
                ...state,
                updatingTask: null,
                updateTaskFailMessage: action.payload,
            }
        case CLEAR_EDIT_TASK_MODAL:
            return {
                ...state,
                updateTaskSuccessMessage: null,
                updateTaskFailMessage: null,
            }
        case DELETE_TASK:
            const updated = state.tasks.filter(task => !isEqual(task._id, action.payload))
            return {
                ...state,
                tasks: updated
            }
        default: return state
    }
  }