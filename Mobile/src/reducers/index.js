import taskReducer from './taskReducer'
import { combineReducers } from 'redux'
export default combineReducers({
    taskList: taskReducer
})