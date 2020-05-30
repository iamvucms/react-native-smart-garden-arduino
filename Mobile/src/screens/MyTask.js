import React, { useState } from 'react'
import { Image, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { FetchTaskRequest } from '../actions/taskActions'
import HeaderBg from '../components/HeaderBg'
import TaskList from '../components/TaskList'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants'
import { goBack } from '../rootNavigation'
const MyTask = () => {
    const dispatch = useDispatch()
    const [refresh, setRefresh] = useState(false)
    const taskList = useSelector(state => state.taskList)
    const [renderTasks, setRenderTasks] = useState([...(taskList || [])])
    const _onRefresh = () => {
        dispatch(FetchTaskRequest())
    }
    const done = [...taskList].filter(x => x.done)
    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <View style={styles.header}>
                <HeaderBg style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                }} />
                <View style={{
                    marginVertical: 30,
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                    >
                        <Image style={{
                            height: 36,
                            width: 36
                        }} source={require('../assests/back.png')} />
                    </TouchableOpacity>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 32,
                        color: '#fff'
                    }}>MY TASKS</Text>

                </View>
            </View>
            <View style={styles.overview}>
                <TouchableOpacity
                    onPress={() => setRenderTasks([...(taskList || [])])
                    }
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 100
                    }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'orange'
                    }}>All Tasks</Text>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 18
                    }}>{taskList.length || 0}</Text>
                </TouchableOpacity>
                <View style={styles.overviewItemWrapper}>
                    <TouchableOpacity
                        onPress={() => {
                            setRenderTasks([...(taskList || [])].filter(x => x.done))
                        }}
                        style={styles.overviewItem}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'green'
                        }}>Completed</Text>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 16
                        }}>{done.length || 0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setRenderTasks([...(taskList || [])].filter(x => !x.done))
                        }}
                        style={styles.overviewItem}>
                        <View style={{
                            height: 3,
                            width: 50,
                            backgroundColor: "#ddd",
                            position: 'absolute',
                            transform: [{
                                rotate: '90deg'
                            }],
                            left: -25,
                            top: 50
                        }} />
                        <Text style={{
                            color: 'gray',
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>Active</Text>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 16
                        }}>{taskList.length - done.length}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={_onRefresh}
                    />
                }
                style={{
                    height: SCREEN_HEIGHT - 180 - 230
                }}
                showsVerticalScrollIndicator={false}
                bounces={true}>
                <View style={styles.separate}>
                    <View style={{
                        height: 20,
                        backgroundColor: '#f2f2f2',
                        width: 140,
                        marginHorizontal: 2.5,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: (3 - 20) / 2,
                        left: (SCREEN_WIDTH * 0.9 - 140) / 2
                    }}>
                        <Image style={{
                            width: 20,
                            height: 20,
                            marginRight: 2.5
                        }} source={require('../assests/list.png')} />
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#999'
                        }}>All Tasks</Text>
                    </View>
                </View>
                <TaskList taskList={renderTasks} />
            </ScrollView>
        </View >
    )
}

export default MyTask

const styles = StyleSheet.create({
    container: {
    },
    header: {
        position: 'relative',
        height: 180
    },
    overview: {
        marginVertical: 15,
        width: '90%',
        height: 200,
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.29,
        shadowRadius: 3,
        elevation: 5,
    },
    overviewItemWrapper: {
        width: '100%',
        flexDirection: 'row'
    },
    overviewItem: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: '50%',
    },
    separate: {
        height: 2,
        marginHorizontal: '5%',
        marginVertical: 15,
        backgroundColor: '#ddd'
    },
    btnViewAllTask: {
        marginVertical: 15,
        height: 44,
        width: '90%',
        borderRadius: 5,
        marginHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#318bfb'
    }
})
