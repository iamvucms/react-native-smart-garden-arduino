import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TaskItem from './TaskItem'
import { useDispatch, useSelector } from 'react-redux'
import { FetchTaskRequest } from '../../actions/taskActions'

const TaskList = ({ taskList, isPreview }) => {
    let renderTask = [...(taskList || [])]
    if (isPreview) renderTask = renderTask.splice(0, 5)
    return (
        <View style={styles.container}>
            {renderTask.map((task, index) => (
                <TaskItem key={index} task={task} />
            ))}
        </View >
    )
}

export default TaskList

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '5%',
    },

})
