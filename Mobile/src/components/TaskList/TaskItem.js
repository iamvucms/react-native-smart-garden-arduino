import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const TaskItem = () => {
    return (
        <View style={styles.container}>
            <Text>Turn on pump at 5pm</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Image />
                <Image />
            </View>
        </View>
    )
}

export default TaskItem

const styles = StyleSheet.create({
    container: {
        height: 44,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 5,
        borderColor: "#ddd",
        borderWidth: 0.5,
        borderRadius: 5,
    }
})
