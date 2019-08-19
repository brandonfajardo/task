import { combineReducers } from 'redux'
import authReducer from './auth'
import taskReducer from './task'

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
})

export default rootReducer