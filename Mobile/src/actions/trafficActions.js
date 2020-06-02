import { trafficActionTypes } from '../reducers/trafficReducer'
import { db } from '../constants'
import store from '../store'
const isExist = (list = [], timestamp) => {
    let L = 0
    let R = list.length - 1
    let check = false
    while (L <= R) {
        let index = Math.floor((L + R) / 2)
        if (list[index].date > timestamp) {
            R = index - 1
        } else if (list[index].date < timestamp) {
            L = index + 1
        } else {
            check = true
            break
        }
    }
    return check
}
let monitoring = false
export const FetchTrafficRequest = () => {
    return dispatch => {
        try {

            const payload = {}
            db.child('humidities').once('value', value => {
                const preHumidities = store.getState().traffic.humidities
                let temp = []
                for (let key in value.val()) {
                    if (value.val()[key].hasOwnProperty('date')) {
                        temp.push({
                            ...value.val()[key]
                        })
                    }
                }
                temp = temp.sort((a, b) => a.date - b.date)
                payload.humidities = temp
                db.child('temperatures').once('value', value2 => {
                    const preTemperatures = store.getState().traffic.temperatures
                    let temp2 = []

                    for (let key in value2.val()) {
                        if (value2.val()[key].hasOwnProperty('date')) {
                            temp2.push({
                                ...value2.val()[key]
                            })
                        }
                    }
                    temp2 = temp2.sort((a, b) => a.date - b.date)
                    payload.temperatures = temp2
                    dispatch({
                        type: trafficActionTypes.FETCH_TRAFFIC_SUCCESS,
                        payload
                    })
                    //trigger add
                    if (!monitoring) {
                        db.child('humidities').on('child_added', value => {
                            const preHumidities = store.getState().traffic.humidities
                            let temp = [...preHumidities]
                            if (!isExist(temp, value.val().date) &&
                                value.val().hasOwnProperty('date')
                            ) {
                                temp.push({
                                    ...value.val()
                                })
                                dispatch({
                                    type: trafficActionTypes.UPDATE_TRAFFIC_SUCCESS,
                                    payload: {
                                        humidities: temp
                                    }
                                })
                            }
                        })
                        db.child('temperatures').on('child_added', value => {
                            const preTemperatures = store.getState().traffic.temperatures
                            let temp = [...preTemperatures]
                            if (!isExist(temp, value.val().date) &&
                                value.val().hasOwnProperty('date')
                            ) {
                                temp.push({
                                    ...value.val()
                                })
                                dispatch({
                                    type: trafficActionTypes.UPDATE_TRAFFIC_SUCCESS,
                                    payload: {
                                        temperatures: temp
                                    }
                                })
                            }
                        })
                        monitoring = true
                    }
                })
            })
        } catch (e) {
            dispatch({
                type: trafficActionTypes.FETCH_TRAFFIC_FAILURE,
                payload: {
                    message: `Can't load traffic!`
                }
            })
        }
    }
}