import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import { RemoveTaskRequest } from '../../actions/taskActions'

const TaskItem = ({ task }) => {
    const time = new Date(parseInt(task.from))
    let remainingTime = Math.abs((time.getTime() - new Date().getTime()) / 1000)
    const hour = `0${Math.floor(remainingTime / 3600)}`.slice(-2)
    const min = `0${Math.floor((remainingTime - hour * 3600) / 60)}`.slice(-2)
    const second = `0${Math.round(remainingTime - hour * 3600 - min * 60)}`.slice(-2)
    let textName = ''
    if (time.getTime() - new Date().getTime() > 0) {
        textName = `${hour} hours, ${min} minutes left`
    } else {
        textName = `${hour} hours, ${min} minutes ago`
    }
    const _removeTask = () => {
        Alert.alert('Remove Task', 'Are you sure ?', [
            {
                text: 'OK',
                onPress: () => RemoveTaskRequest(task.id)
            },
            {
                text: 'Cancel',
            },
        ])

    }
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={{
                ...styles.container,
                backgroundColor: task.done ? '#6cc070' : '#dddddd'
            }}>
            <Text>{textName}</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                {!task.done &&
                    < TouchableOpacity >
                        <Image style={{
                            width: 24,
                            height: 24
                        }} source={require('../../assests/edit.png')} />
                    </TouchableOpacity>
                }
                <TouchableOpacity
                    onPress={_removeTask}
                >
                    <Image style={{
                        marginLeft: 10,
                        width: 24,
                        height: 24
                    }} source={require('../../assests/remove.png')} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity >
    )
}

export default TaskItem

const styles = StyleSheet.create({
    container: {
        height: 44,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 5,
        borderColor: "#ddd",
        borderWidth: 0.5,
        borderRadius: 5,
    }
})
