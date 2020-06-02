import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import Orientation from 'react-native-orientation'
import { useSelector } from 'react-redux'
import { ScrollView, FlatList } from 'react-native-gesture-handler'
import { SCREEN_WIDTH, SCREEN_HEIGHT, db } from '../constants'
import ChartCol from '../components/ChartCol'
import DateCol from '../components/ChartCol/DateCol'

const Humidity = () => {
    const traffic = useSelector(state => state.traffic)
    const [humidities, setHumidities] = useState([...traffic.humidities] || [])
    const [maxValue, setMaxValue] = useState(250)
    const flatListRef = useRef(null)
    const flatListDateRef = useRef(null)
    const timeoutRef = useRef(null)
    const scrollDateTimeoutRef = useRef(null)
    const invRef = useRef(null)

    useEffect(() => {
        console.warn(humidities.length)
        let temp = [...traffic.humidities]
        setHumidities(temp)
    }, [traffic])
    useEffect(() => {
        //  invRef.current = setInterval(() => {
        //     db.child('humidities').child(`${new Date().getTime()}`)
        //         .set({
        //             date: new Date().getTime(),
        //             value: Math.floor(Math.random() * Math.floor(80))
        //         })
        // }, 2500);
        Orientation.lockToLandscapeRight()
        return () => {
            clearTimeout(scrollDateTimeoutRef.current)
            clearTimeout(timeoutRef.current)
            clearInterval(invRef.current)
            Orientation.lockToPortrait()
        }
    }, [])
    const _onContentSizeChange = (x) => {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd()
            }
        }, 500);
    }
    if (maxValue === 0) return null
    return (
        <View>
            <View style={styles.header}>
                <Image style={{
                    width: 20,
                    height: 20,
                    marginRight: 3,
                }} source={require('../assests/plant-pot.png')} />
                <Text style={{
                    fontSize: 24,
                    color: '#fff',
                    fontWeight: '600'
                }}>Humidity Realtime Tracking</Text>
            </View>
            <View style={styles.chartWrapper}>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: SCREEN_HEIGHT - 385
                }}>
                    <View style={styles.unitCols}>

                    </View>
                    <FlatList
                        scrollEventThrottle={10}
                        onScroll={({ nativeEvent: { contentOffset: { x } } }) => {
                            clearTimeout(scrollDateTimeoutRef.current)
                            scrollDateTimeoutRef.current = setTimeout(() => {
                                flatListDateRef.current.scrollToOffset({
                                    offset: x,
                                    animated: true
                                })
                            }, 300);
                        }}

                        // updateCellsBatchingPeriod={150}
                        // maxToRenderPerBatch={Math.round(humidities.length / 5)}
                        removeClippedSubviews={true}
                        ref={flatListRef}
                        onContentSizeChange={_onContentSizeChange}
                        style={{
                            height: '100%',
                            width: '100%',
                            paddingLeft: 5,
                        }}
                        data={humidities}
                        horizontal={true}
                        renderItem={({ item }) =>
                            <ChartCol
                                type="humidity"
                                maxValue={maxValue}
                                item={item} />}
                        keyExtractor={(item, index) => `${index}`}
                    />
                </View>
                <View style={{
                    width: SCREEN_HEIGHT - 50,
                    height: 75,
                    borderTopColor: '#999',
                    borderTopWidth: 2,
                    zIndex: 999,
                }}>
                    <FlatList
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        ref={flatListDateRef}
                        onContentSizeChange={_onContentSizeChange}
                        style={{
                            height: '100%',
                            width: '100%',
                            paddingLeft: 5,
                        }}
                        data={humidities}
                        horizontal={true}
                        renderItem={({ item }) => <DateCol item={item} />}
                        keyExtractor={(item, index) => `${index}`}
                    />
                </View>
            </View>
        </View>
    )
}

export default Humidity

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#318bfb',
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chartWrapper: {
        height: '100%',
        width: '100%',
        padding: 25,
        paddingBottom: 0,
        paddingLeft: 25
    },
    unitCols: {
        width: 2,
        backgroundColor: '#999'
    }
})
