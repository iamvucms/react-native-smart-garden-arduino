import { taskActions } from '../reducers/taskReducer'
import { db } from '../constants'
let monitoring = false
export const FetchTaskRequest = () => {
    return dispatch => {
        try {
            if (monitoring === false) {
                db.child('pumpTimer').on('child_changed', value => {
                    let payload = []
                    for (let key in value.val()) {
                        payload.push({
                            id: parseInt(key),
                            ...value.val()[key]
                        })
                    }
                    payload = payload.sort((a, b) => {
                        const time1 = new Date(parseInt(a.from)).getTime()
                        const time2 = new Date(parseInt(b.from)).getTime()
                        return time2 - time1
                    })
                    dispatch({
                        type: taskActions.FETCH_TASK_SUCCESS,
                        payload
                    })
                })
                monitoring = true
            }
            db.child('pumpTimer').on('value', value => {
                let payload = []
                for (let key in value.val()) {
                    payload.push({
                        id: parseInt(key),
                        ...value.val()[key]
                    })
                }
                payload = payload.sort((a, b) => {
                    const time1 = new Date(parseInt(a.from)).getTime()
                    const time2 = new Date(parseInt(b.from)).getTime()
                    return time2 - time1
                })
                dispatch({
                    type: taskActions.FETCH_TASK_SUCCESS,
                    payload
                })
            })
        } catch (e) {
            dispatch({
                type: taskActions.FETCH_TASK_FAILURE,
                payload: {
                    message: `Can't fetch task!`
                }
            })
        }
    }
}
export const RemoveTaskRequest = (id) => {
    db.child('pumpTimer').child(`${id}`).remove(() => { })
}