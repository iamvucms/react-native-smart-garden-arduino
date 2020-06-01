import { Alert } from 'react-native'
const defaultState = {
    temperatures: [],
    humidities: []
}
export const trafficActionTypes = {
    FETCH_TRAFFIC_FAILURE: 'FETCH_TRAFFIC_FAILURE',
    FETCH_TRAFFIC_REQUEST: 'FETCH_TRAFFIC_REQUEST',
    FETCH_TRAFFIC_SUCCESS: 'FETCH_TRAFFIC_SUCCESS',
    UPDATE_TRAFFIC_FAILURE: 'UPDATE_TRAFFIC_FAILURE',
    UPDATE_TRAFFIC_REQUEST: 'UPDATE_TRAFFIC_REQUEST',
    UPDATE_TRAFFIC_SUCCESS: 'UPDATE_TRAFFIC_SUCCESS',
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case trafficActionTypes.FETCH_TRAFFIC_REQUEST:
            state = { ...defaultState }
            return state
        case trafficActionTypes.FETCH_TRAFFIC_SUCCESS:
            state = { ...action.payload }
            return state
        case trafficActionTypes.FETCH_TRAFFIC_FAILURE:
            Alert.alert("Error", action.payload.message)
            state = defaultState
            return state
        case trafficActionTypes.UPDATE_TRAFFIC_REQUEST:
            state = { ...defaultState }
            return state
        case trafficActionTypes.UPDATE_TRAFFIC_SUCCESS:
            state = { ...state, ...action.payload }
            return state
        case trafficActionTypes.UPDATE_TRAFFIC_FAILURE:
            Alert.alert("Error", action.payload.message)
            state = defaultState
            return state
        default:
            return state
    }
}
export default reducer