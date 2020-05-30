import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TaskItem from './TaskItem'
import { SCREEN_WIDTH } from '../../constants'

const TaskList = () => {
    return (
        <View style={styles.container}>
            
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
        </View >
    )
}

export default TaskList

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '5%',
    },
    
})
