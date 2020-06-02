import taskReducer from './taskReducer'
import statusReducer from './statusReducer'
import trafficReducer from './trafficReducer'
import { combineReducers } from 'redux'
export default combineReducers({
    taskList: taskReducer,
    status: statusReducer,
    traffic: trafficReducer
})