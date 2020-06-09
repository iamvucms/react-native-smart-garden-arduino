import React, { useEffect, useState, useRef } from 'react'
import { Image, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { FetchTaskRequest, AddTaskRequest } from '../actions/taskActions'
import HeaderBg from '../components/HeaderBg'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants'
import { goBack, navigate } from '../rootNavigation'
import DateTimePicker from '@react-native-community/datetimepicker'
import Input from '../components/Input'
import Switcher from '../components/Switcher'
const AddTask = () => {
    const dispatch = useDispatch()
    const [mode, setMode] = useState(0)
    const [dateFrom, setDateFrom] = useState()
    const [dateFinish, setDateFinish] = useState()
    const [pump, setPump] = useState(true)
    const [LED, setLED] = useState(false)
    const [name, setName] = useState('')
    const ref = useRef({})
    /**
     * mode:0 => close datetimepicker
     * mode:1=>show datepicker
     * mode:2=>show timepicker
     */
    const [pickDateTimeFor, setPickDateTimeFor] = useState(0)
    /**
         * pickDateTimeFor:0 => pick start datetime
         * pickDateTimeFor:1=> pick finish datetime
         */

    const taskList = useSelector(state => state.taskList)
    useEffect(() => {

    }, [])
    const _onDoneDateFrom = (e) => {
        if (e.nativeEvent?.timestamp) {
            ref.current.dateFrom = e.nativeEvent.timestamp
            setMode(2)
        } else {
            setMode(0)
        }
    }
    const _onDoneTimeFrom = (e) => {
        setMode(0)
        
        if (e.nativeEvent?.timestamp) {
            const date = new Date(ref.current.dateFrom)
            const time = new Date(e.nativeEvent.timestamp)
            const dateTime = new Date(new Date(`${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)}T${`0${time.getHours()}`.slice(-2)}:${`0${time.getMinutes()}`.slice(-2)}:${`0${time.getSeconds()}`.slice(-2)}.000Z`).getTime() - 7 * 3600 * 1000)
            if (dateTime.getTime() < new Date().getTime()) {
                Alert.alert("Error!", 'Check the begin and finish time')
            } else setDateFrom(dateTime)
        }
    }
    const _onDoneDateFinish = (e) => {
        if (e.nativeEvent?.timestamp) {
            ref.current.dateFinish = e.nativeEvent.timestamp
            setMode(2)
        } else {
            setMode(0)
        }
    }
    const _onDoneTimeFinish = (e) => {
        setMode(0)
        if (e.nativeEvent?.timestamp) {
            const date = new Date(ref.current.dateFinish)
            const time = new Date(e.nativeEvent.timestamp)
            const dateTime = new Date(new Date(`${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)}T${`0${time.getHours()}`.slice(-2)}:${`0${time.getMinutes()}`.slice(-2)}:${`0${time.getSeconds()}`.slice(-2)}.000Z`).getTime() - 7 * 3600 * 1000)
            if (dateTime.getTime() < dateFrom.getTime()) {
                Alert.alert("Error!", 'Check the begin and finish time')
            } else setDateFinish(dateTime)
        }
    }
    const _createTask = () => {
        if (name.length === 0) {
            Alert.alert('Error', 'Name is required!')
            return;
        }
        if (dateFrom === undefined || dateFinish === undefined) {
            Alert.alert('Error',
                `Please type begin and finish time correctly`)
            return;
        }
        if (!LED && !pump) {
            Alert.alert('Error',
                `You need choose at least 1 action`)
            return;
        }
        Alert.alert('Switcher to Timer mode', 'You need to switch to Timer mode to make this task active', [
            {
                text: 'Switch and Create Task',
                onPress: () => {
                    const task = {
                        from: Math.round(dateFrom.getTime() / 1000),
                        to: Math.round(dateFinish.getTime() / 1000),
                        actions: {
                            turnOnPump: pump ? 1 : 0,
                            turnOnLED: LED ? 1 : 0
                        },
                        done: false,
                        name: name
                    }
                    AddTaskRequest(task)
                    goBack()
                    navigate('MyTask')
                }
            }, {
                text: 'Cancel'
            }
        ])
    }
    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />

            <ScrollView
                style={{
                    height: SCREEN_HEIGHT
                }}
                showsVerticalScrollIndicator={false}
            >
                <View >
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
                            }}>CREATE NEW TASK</Text>

                        </View>
                    </View>
                    <View style={styles.separate}>
                        <View style={{
                            height: 20,
                            backgroundColor: '#f2f2f2',
                            width: 180,
                            marginHorizontal: 2.5,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            top: (3 - 20) / 2,
                            left: (SCREEN_WIDTH * 0.9 - 180) / 2
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
                            }}>Task Information</Text>
                        </View>
                    </View>
                    <View style={{
                        paddingVertical: 10,
                    }}>
                        <Input containerStyle={{
                            width: '90%',
                            alignSelf: 'center',
                        }} value={name} name="Task name"
                            onChangeText={setName}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setMode(1)
                                setPickDateTimeFor(0)
                            }}
                            activeOpacity={0.8}
                            style={styles.mockInput}>
                            <Image style={{
                                width: 30,
                                height: 30,
                                marginRight: 5,
                            }} source={require('../assests/start.png')} />
                            <Text style={{
                                fontSize: 16,
                                color: dateFrom ? '#000' : '#999'
                            }}>{dateFrom ? `${`0${dateFrom.getHours()}`.slice(-2)}:${`0${dateFrom.getMinutes()}`.slice(-2)}:${`0${dateFrom.getSeconds()}`.slice(-2)} ${`0${dateFrom.getDate()}`.slice(-2)}/${`0${dateFrom.getMonth() + 1}`.slice(-2)}/${dateFrom.getFullYear()}` : 'Begin Time'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setMode(1)
                                setPickDateTimeFor(1)
                            }}
                            activeOpacity={0.8}
                            style={styles.mockInput}>
                            <Image style={{
                                width: 30,
                                height: 30,
                                marginRight: 5,
                            }} source={require('../assests/finish.png')} />
                            <Text style={{
                                fontSize: 16,
                                color: dateFinish ? '#000' : '#999'
                            }}>{dateFinish ? `${`0${dateFinish.getHours()}`.slice(-2)}:${`0${dateFinish.getMinutes()}`.slice(-2)}:${`0${dateFinish.getSeconds()}`.slice(-2)} ${`0${dateFinish.getDate()}`.slice(-2)}/${`0${dateFinish.getMonth() + 1}`.slice(-2)}/${dateFinish.getFullYear()}` : 'Finish Time'}</Text>
                        </TouchableOpacity>
                        <View style={{
                            marginTop: 15,
                            width: '90%',
                            alignSelf: 'center',
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                            }}>Actions:</Text>
                            <View style={{
                                height: 44,
                                alignItems: 'center',
                                width: '100%',

                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{
                                    color: pump ? '#000' : '#999'
                                }}>Turn On PUMP </Text>
                                <Switcher on={pump}
                                    onTurnOff={setPump.bind(null, false)}
                                    onTurnOn={setPump.bind(null, true)}
                                />
                            </View>
                            <View style={{
                                height: 44,
                                alignItems: 'center',
                                width: '100%',

                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{
                                    color: LED ? '#000' : '#999'
                                }}>Turn On LED</Text>
                                <Switcher on={LED}
                                    onTurnOff={setLED.bind(null, false)}
                                    onTurnOn={setLED.bind(null, true)}
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={_createTask}
                            style={styles.btnAdd}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: '#fff'
                            }}>Create task</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {mode !== 0 && <DateTimePicker
                removeClippedSubviews={true}
                onChange={pickDateTimeFor === 0 ? (
                    mode === 1 ? _onDoneDateFrom : _onDoneTimeFrom
                ) : (
                        mode === 1 ? _onDoneDateFinish : _onDoneTimeFinish
                    )}
                is24Hour={true}
                mode={mode === 1 ? 'date' : 'time'}
                value={(pickDateTimeFor === 0 ? (
                    mode === 1 ? dateFrom : dateFrom
                ) : (
                        mode === 1 ? dateFinish : dateFinish
                    )) || new Date()}
            />}
        </View >
    )
}

export default AddTask

const styles = StyleSheet.create({
    container: {
    },
    header: {
        position: 'relative',
        height: 180
    },
    separate: {
        height: 2,
        marginHorizontal: '5%',
        marginVertical: 15,
        backgroundColor: '#ddd'
    },
    btnAdd: {
        height: 44,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#318bfb',
        borderRadius: 5,
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mockInput: {
        flexDirection: 'row',
        borderRadius: 5,
        marginTop: 22,
        zIndex: 0,
        backgroundColor: "#fff",
        height: 44,
        width: '90%',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        paddingHorizontal: 10,
        alignItems: 'center',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})
