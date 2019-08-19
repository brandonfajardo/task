import { 
    CREATE_TASK,
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAIL,
    FETCH_TASK,
    FETCH_TASK_SUCCESS,
    FETCH_TASK_FAIL,
    CLEAR_CREATE_TASK_MODAL,
    UPDATE_TASK,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAIL,
    DELETE_TASK,
    CLEAR_EDIT_TASK_MODAL,
} from './types'
import { 
    taskCreate,
    fetchTask,
    updateTasks,
    deleteTasks,
} from '../../firebase/api'
import isNil from 'lodash/isNil'

export const createTask = (email, description, priority) => {
    return async dispatch => {
        dispatch({ type: CREATE_TASK })

        const { data, error } = await taskCreate(email, description, priority)
        
        if (!isNil(data) && isNil(error)) {
            dispatch({ 
                type: CREATE_TASK_SUCCESS,
                payload: { 
                    message: 'Task successfully created!',
                    data: {
                        _id: data,
                        email,
                        description,
                        priority
                    }
                }
            })
        } else {
            dispatch({ type: CREATE_TASK_FAIL, payload: error })
        }
    }
}

export const fetchTasks = email => {
    return dispatch => {
        dispatch({ type: FETCH_TASK })
        
        setTimeout(async () => { // Just want to show dot animation :)
            const { data, error } = await fetchTask(email)
            if (isNil(error) && !isNil(data)) {
                dispatch({ type: FETCH_TASK_SUCCESS, payload: data })
            } else {
                dispatch({ type: FETCH_TASK_FAIL, payload: error })
            }
        }, 2000)
    }
}

export const clearCreateTaskModal = () => ({
    type: CLEAR_CREATE_TASK_MODAL
})

export const clearEditTaskModal = () => ({
    type: CLEAR_EDIT_TASK_MODAL
})

export const deleteTask = id => {
    deleteTasks(id)
    return {
        type: DELETE_TASK,
        payload: id,
    }
}

export const updateTask = (id, priority, description) => {
    return async dispatch => {
        dispatch({ type: UPDATE_TASK })
        const { data, error } = await updateTasks(id, priority, description)

        if (isNil(error) && !isNil(data)) {
            dispatch({ type: UPDATE_TASK_SUCCESS, payload: {
                message: 'Task updated successfully!',
                data: {
                    id,
                    priority,
                    description
                }
            }})
        } else {
            dispatch({ type: UPDATE_TASK_FAIL, payload: error })

        }
    }
}