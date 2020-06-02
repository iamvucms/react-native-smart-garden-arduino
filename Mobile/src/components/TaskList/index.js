import React from 'react'
import { StyleSheet, View } from 'react-native'
import TaskItem from './TaskItem'

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
