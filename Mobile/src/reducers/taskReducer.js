import { Alert } from 'react-native'
const defaultState = []
export const taskActions = {
    FETCH_TASK_FAILURE: 'FETCH_TASK_FAILURE',
    FETCH_TASK_REQUEST: 'FETCH_TASK_REQUEST',
    FETCH_TASK_SUCCESS: 'FETCH_TASK_SUCCESS',
    REMOVE_TASK_FAILURE: 'REMOVE_TASK_FAILURE',
    REMOVE_TASK_REQUEST: 'REMOVE_TASK_REQUEST',
    REMOVE_TASK_SUCCESS: 'REMOVE_TASK_SUCCESS'
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case taskActions.FETCH_TASK_REQUEST:
            state = defaultState
            return state
        case taskActions.FETCH_TASK_SUCCESS:
            state = [...action.payload]
            return state
        case taskActions.FETCH_TASK_FAILURE:
            Alert.alert("Error", action.payload.message)
            state = defaultState
            return state
        case taskActions.REMOVE_TASK_REQUEST:
            state = defaultState
            return state
        case taskActions.REMOVE_TASK_SUCCESS:
            state = [...action.payload]
            return state
        case taskActions.REMOVE_TASK_FAILURE:
            Alert.alert("Error", action.payload.message)
            state = defaultState
            return state
        default:
            return state
    }
}
export default reducer