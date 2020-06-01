import { Alert } from 'react-native'
const defaultState = {}
export const statusActionTypes = {
    FETCH_STATUS_FAILURE: 'FETCH_STATUS_FAILURE',
    FETCH_STATUS_REQUEST: 'FETCH_STATUS_REQUEST',
    FETCH_STATUS_SUCCESS: 'FETCH_STATUS_SUCCESS',
    UPDATE_STATUS_FAILURE: 'UPDATE_STATUS_FAILURE',
    UPDATE_STATUS_REQUEST: 'UPDATE_STATUS_REQUEST',
    UPDATE_STATUS_SUCCESS: 'UPDATE_STATUS_SUCCESS',
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case statusActionTypes.FETCH_STATUS_REQUEST:
            state = { ...defaultState }
            return state
        case statusActionTypes.FETCH_STATUS_SUCCESS:
            state = { ...action.payload }
            return state
        case statusActionTypes.FETCH_STATUS_FAILURE:
            Alert.alert("Error", action.payload.message)
            state = defaultState
            return state
        case statusActionTypes.UPDATE_STATUS_REQUEST:
            state = { ...defaultState }
            return state
        case statusActionTypes.UPDATE_STATUS_SUCCESS:
            state = { ...state, ...action.payload }
            return state
        case statusActionTypes.UPDATE_STATUS_FAILURE:
            Alert.alert("Error", action.payload.message)
            state = defaultState
            return state
        default:
            return state
    }
}
export default reducer