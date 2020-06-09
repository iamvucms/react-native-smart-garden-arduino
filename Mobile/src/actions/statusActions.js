import { statusActionTypes } from '../reducers/statusReducer'
import { db } from '../constants'
export const FetchStatusRequest = () => {
    return dispatch => {
        try {
            const payload = {}
            db.child('turnOnLED').on('value', value => {
                payload.turnOnLED = value.val()
                db.child('turnOnPump').on('value', value => {
                    payload.turnOnPump = value.val()
                    db.child('temperatureLimit').on('value', value => {
                        payload.temperatureLimit = value.val()
                        db.child('humidityLimit').on('value', value => {
                            payload.humidityLimit = value.val()
                            db.child('mode').on('value', value => {
                                payload.mode = value.val()
                                dispatch({
                                    type: statusActionTypes.FETCH_STATUS_SUCCESS,
                                    payload
                                })
                            })
                        })
                    })
                })
            })
        } catch (e) {
            dispatch({
                type: statusActionTypes.FETCH_STATUS_FAILURE,
                payload: {
                    message: `Can't load status!`
                }
            })
        }
    }
}
export const UpdateStatusRequest = (payload) => {
    return dispatch => {
        if (payload.hasOwnProperty('turnOnLED')) {
            db.child('turnOnLED').set(payload.turnOnLED ? 1 : 0)
        }
        if (payload.hasOwnProperty('turnOnPump')) {
            db.child('turnOnPump').set(payload.turnOnPump ? 1 : 0)
        }
        if (payload.hasOwnProperty('humidityLimit')) {
            db.child('humidityLimit').set(payload.humidityLimit)
        }
        if (payload.hasOwnProperty('temperatureLimit')) {
            db.child('temperatureLimit').set(payload.temperatureLimit)
        }
        if (payload.hasOwnProperty('mode')) {
            db.child('mode').set(payload.mode)
        }
    }
}