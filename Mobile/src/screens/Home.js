import React, { useState, useEffect } from 'react'
import { StyleSheet, StatusBar, Animated, Image, View, Text, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl, TextInput } from 'react-native'
import HeaderBg from '../components/HeaderBg'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants'
import TaskList from '../components/TaskList'
import { useDispatch, useSelector } from 'react-redux'
import { FetchTaskRequest } from '../actions/taskActions'
import { FetchTrafficRequest } from '../actions/trafficActions'
import { FetchStatusRequest, UpdateStatusRequest } from '../actions/statusActions'
import { navigate } from '../rootNavigation'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Radio from '../components/Radio'
const Home = () => {
    const dispatch = useDispatch()
    const [refresh, setRefresh] = useState(false)
    const [showSetting, setShowSetting] = useState(false)
    const taskList = useSelector(state => state.taskList)
    const status = useSelector(state => state.status)
    const traffic = useSelector(state => state.traffic)
    const _offsetXSetting = React.useMemo(() => new Animated.Value(SCREEN_WIDTH), [])

    useEffect(() => {
        dispatch(FetchTaskRequest())
        dispatch(FetchStatusRequest())
        dispatch(FetchTrafficRequest())
    }, [])
    const _onRefresh = () => {
        dispatch(FetchTaskRequest())
        dispatch(FetchStatusRequest())
        dispatch(FetchTrafficRequest())
    }
    const _onGestureEventHandler = ({ nativeEvent }) => {
        if (nativeEvent.translationX > 0) {
            _offsetXSetting.setValue(SCREEN_WIDTH * 0.2 + nativeEvent.translationX)
        }
    }
    const _onStateChange = ({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
            if (nativeEvent.translationX > SCREEN_WIDTH * 0.4) {
                Animated.timing(_offsetXSetting, {
                    toValue: SCREEN_WIDTH,
                    duration: 50,
                    useNativeDriver: true,
                }).start(() => setShowSetting(false))
            } else {
                Animated.timing(_offsetXSetting, {
                    toValue: SCREEN_WIDTH * 0.2,
                    duration: 100,
                    useNativeDriver: true,
                }).start()
            }
        }
    }
    return (
        <View style={styles.container}>
            {showSetting && <View style={styles.setting}>
                <PanGestureHandler
                    onHandlerStateChange={_onStateChange}
                    onGestureEvent={_onGestureEventHandler}
                >
                    <View style={{
                        width: '100%',
                        height: '100%',
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                Animated.timing(_offsetXSetting, {
                                    toValue: SCREEN_WIDTH,
                                    duration: 150,
                                    useNativeDriver: true,
                                }).start(() => setShowSetting(false))
                            }}
                            activeOpacity={1}
                            style={styles.settingBackdrop} />
                        <Animated.View
                            onLayout={() => {
                                Animated.timing(_offsetXSetting, {
                                    toValue: SCREEN_WIDTH * 0.2,
                                    duration: 250,
                                    useNativeDriver: true,
                                }).start()
                            }}
                            style={{
                                transform: [{
                                    translateX: _offsetXSetting
                                }],
                                width: '80%',
                                height: '100%',
                                backgroundColor: '#fff'
                            }}>
                            <View style={{
                                width: '100%',
                                padding: 15,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image style={{
                                    height: 30,
                                    width: 30,
                                    marginRight: 10,
                                }} source={require('../assests/setting.png')} />
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 30
                                }}>SETTING</Text>
                            </View>
                            <View>
                                <View style={{
                                    paddingHorizontal: 15,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: 15
                                }}>
                                    <Text style={{
                                        fontWeight: '600',
                                        fontSize: 20
                                    }}>Mode</Text>
                                    <Text style={{
                                        color: '#666'
                                    }}>
                                        {status.mode === 1 ? 'Automatic' : 'Timer'}
                                    </Text>
                                </View>
                                <Radio
                                    onChange={(value) => {
                                        dispatch(UpdateStatusRequest({
                                            mode: value
                                        }))
                                    }}
                                    labels={['Manual', 'Automatic', 'Timer']}
                                    values={[0, 1, 2]}
                                    defaultSelected={status.mode}
                                />
                            </View>
                            {status.mode === 1 ? (
                                <View style={{
                                    marginTop: 10
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingHorizontal: 15
                                    }}>
                                        <Text style={{
                                            fontWeight: '600',
                                            fontSize: 18
                                        }}>Humidity Limit</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            height: 36
                                        }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    dispatch(UpdateStatusRequest({
                                                        humidityLimit: status.humidityLimit - 1
                                                    }))
                                                }}
                                                style={{
                                                    width: 36,
                                                    height: '100%',
                                                    borderWidth: 0.5,
                                                    borderColor: '#ddd',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                <Text>-</Text>
                                            </TouchableOpacity>
                                            <Text
                                                style={{
                                                    lineHeight: 36,
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    width: 36,
                                                    height: '100%',
                                                    borderWidth: 0.5,
                                                    borderColor: '#ddd',
                                                }}>{status.humidityLimit || 0}</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setTimeout(() => {
                                                        dispatch(UpdateStatusRequest({
                                                            humidityLimit: status.humidityLimit + 1
                                                        }))
                                                    }, 0);
                                                }}
                                                style={{
                                                    width: 36,
                                                    height: '100%',
                                                    borderWidth: 0.5,
                                                    borderColor: '#ddd',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                <Text>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingHorizontal: 15
                                    }}>
                                        <Text style={{
                                            fontWeight: '600',
                                            fontSize: 18
                                        }}>Temperature Limit</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            height: 36
                                        }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    dispatch(UpdateStatusRequest({
                                                        temperatureLimit: status.temperatureLimit - 1
                                                    }))
                                                }}
                                                style={{
                                                    width: 36,
                                                    height: '100%',
                                                    borderWidth: 0.5,
                                                    borderColor: '#ddd',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                <Text>-</Text>
                                            </TouchableOpacity>
                                            <Text
                                                style={{
                                                    lineHeight: 36,
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    width: 36,
                                                    height: '100%',
                                                    borderWidth: 0.5,
                                                    borderColor: '#ddd',
                                                }}>{status.temperatureLimit || 0}</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setTimeout(() => {
                                                        dispatch(UpdateStatusRequest({
                                                            temperatureLimit: status.temperatureLimit + 1
                                                        }))
                                                    }, 0);
                                                }}
                                                style={{
                                                    width: 36,
                                                    height: '100%',
                                                    borderWidth: 0.5,
                                                    borderColor: '#ddd',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                <Text>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </View>
                            ) : (
                                    <>
                                        {status.mode === 2 &&
                                            <TouchableOpacity
                                                onPress={() => navigate('AddTask')}
                                                style={{
                                                    marginTop: 10,
                                                    width: SCREEN_WIDTH * 0.8 - 30,
                                                    height: 44,
                                                    marginHorizontal: 15,
                                                    borderRadius: 5,
                                                    backgroundColor: '#318bfb',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                <Text style={{
                                                    fontSize: 16,
                                                    color: '#fff',
                                                    fontWeight: 'bold'
                                                }}>
                                                    Add Timer Task
                                        </Text>
                                            </TouchableOpacity>
                                        }
                                    </>
                                )}
                        </Animated.View>
                    </View>
                </PanGestureHandler>
            </View>
            }<StatusBar hidden={true} />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={_onRefresh}
                    />
                }
                style={{
                    height: SCREEN_HEIGHT
                }}
                showsVerticalScrollIndicator={false}
                bounces={true}>
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
                        <TouchableOpacity
                            onPress={setShowSetting.bind(null, true)}
                        >
                            <Image style={{
                                height: 36,
                                width: 36
                            }} source={require('../assests/setting.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.overview}>
                    <View style={styles.overviewItemWrapper}>
                        <TouchableOpacity
                            onPress={() => navigate('Temperature')}
                            style={styles.overviewItem}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: 'red'
                            }}>Temperature</Text>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>{traffic.temperatures.length > 0 && [...traffic.temperatures][traffic.temperatures.length - 1].value || '--'}°C</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigate('Humidity')}
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
                                color: 'green',
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>Humidity</Text>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>{traffic.humidities.length > 0 && [...traffic.humidities][traffic.humidities.length - 1].value || '--'}%</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.overviewItemWrapper}>

                        <TouchableOpacity
                            onPress={() => {
                                dispatch(UpdateStatusRequest({
                                    turnOnPump: !status.turnOnPump
                                }))
                            }}
                            style={{
                                ...styles.overviewItem
                            }}>

                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: '#318bfb'
                            }}>Pump</Text>
                            <Text style={{
                                color: status.turnOnPump ? '#6cc070' : '#FF3333',//
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>{status.turnOnPump ? 'ON' : 'OFF'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(UpdateStatusRequest({
                                    turnOnLED: !status.turnOnLED
                                }))
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
                                color: 'orange',
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>LED</Text>
                            <Text style={{
                                color: status.turnOnLED ? '#6cc070' : '#FF3333',//
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>{status.turnOnLED ? 'ON' : 'OFF'}</Text>
                        </TouchableOpacity>
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
        height: '100%',
        width: '100%'
    },
    setting: {
        flexDirection: 'row',
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        zIndex: 1
    },
    settingBackdrop: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
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
