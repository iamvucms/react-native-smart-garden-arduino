import React, { useState, useEffect } from 'react'
import { StyleSheet, StatusBar, Image, View, Text, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import HeaderBg from '../components/HeaderBg'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants'
import TaskList from '../components/TaskList'
import { useDispatch, useSelector } from 'react-redux'
import { FetchTaskRequest } from '../actions/taskActions'
import { navigate } from '../rootNavigation'
const Home = () => {
    const dispatch = useDispatch()
    const [refresh, setRefresh] = useState(false)
    const taskList = useSelector(state => state.taskList)
    useEffect(() => {
        dispatch(FetchTaskRequest())
    }, [])
    const _onRefresh = () => {
        dispatch(FetchTaskRequest())
    }
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
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 32,
                        color: '#fff'
                    }}>SMART GARDEN</Text>
                    <TouchableOpacity>
                        <Image style={{
                            height: 36,
                            width: 36
                        }} source={require('../assests/setting.png')} />
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
                    height: SCREEN_HEIGHT - 180
                }}
                showsVerticalScrollIndicator={false}
                bounces={true}>
                <View style={styles.overview}>
                    <View style={styles.overviewItemWrapper}>
                        <TouchableOpacity style={styles.overviewItem}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: 'red'
                            }}>Temporature</Text>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>35°C</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.overviewItem}>
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
                                color: 'green',
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>Humidity</Text>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>90%</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.overviewItemWrapper}>

                        <View style={{
                            ...styles.overviewItem
                        }}>

                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: '#318bfb'
                            }}>Pump</Text>
                            <Text style={{
                                color: '#6cc070',//#FF3333
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>ON</Text>
                        </View>
                        <View style={styles.overviewItem}>
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
                                color: 'orange',
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>LED</Text>
                            <Text style={{
                                color: '#FF3333',//#6cc070
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>OFF</Text>
                        </View>
                    </View>
                </View>
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
                        }}>Overview Tasks</Text>
                    </View>
                </View>
                <TaskList taskList={taskList} isPreview={true} />
                <TouchableOpacity
                    onPress={() => navigate('MyTask')}
                    style={styles.btnViewAllTask}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#fff'
                    }}>View All</Text>
                </TouchableOpacity>
            </ScrollView>
        </View >
    )
}

export default Home

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
