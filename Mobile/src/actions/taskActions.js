import { taskActions } from '../reducers/taskReducer'
import { db } from '../constants'
let monitoring = false
export const FetchTaskRequest = () => {
    return dispatch => {
        try {
            if (monitoring === false) {
                db.child('tasks').on('value', value => {
                    let payload = []
                    for (let key in value.val()) {
                        payload.push({
                            id: parseInt(key),
                            ...value.val()[key],
                        })
                    }
                    payload = payload.sort((a, b) => b.from - a.from)
                    dispatch({
                        type: taskActions.FETCH_TASK_SUCCESS,
                        payload
                    })
                })
                monitoring = true
            }
            db.child('tasks').once('value', value => {
                let payload = []
                for (let key in value.val()) {
                    payload.push({
                        id: parseInt(key),
                        ...value.val()[key]
                    })
                }
                payload = payload.sort((a, b) => b.from - a.from)
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
export const UpdateTaskRequest = (id, task) => {
    db.child('tasks').child(`${id}`).set({
        ...task
    })
}
export const AddTaskRequest = (task) => {
    db.child('mode').set(2)
    db.child('tasks').child(`${task.from}`).set({
        ...task,
    })
}
export const RemoveTaskRequest = (id) => {
    db.child('tasks').child(`${id}`).remove(() => { })
}