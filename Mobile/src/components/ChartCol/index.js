import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SCREEN_WIDTH } from '../../constants'

const ChartCol = ({ maxValue, item, type }) => {
    const bgColor = item.value / maxValue > 0.7 ? (type === "temperature" ? '#f03b20' : '#3182bd') : (
        item.value / maxValue > 0.4 ? (type === "temperature" ? '#feb24c' : '#6baed6') : (type === "temperature" ? '#ffeda0' : '#bdd7e7')
    )
    const date = new Date(item.date)
    return (
        <View style={{
            height: '100%',
            width: 40,
            marginHorizontal: 5,
        }}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: `${(item.value / maxValue >= 1 ? 1 : item.value / maxValue) * 100}%`,
                    width: '100%',
                    borderTopLeftRadius: 7.5,
                    borderTopRightRadius: 7.5,
                    backgroundColor: bgColor
                }}>
                <View style={{
                    height: 30,
                    width: '100%',
                    backgroundColor: '#000',
                    borderRadius: 10,
                    position: 'absolute',
                    top: -42.5,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 10,
                }}>
                    <Text style={{
                        marginTop: 5,
                        color: '#fff',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>{item.value}</Text>
                    <View style={{
                        position: 'absolute',
                        top: '100%',
                        left: 10,
                        borderRightColor: 'rgba(0,0,0,0)',
                        borderRightWidth: 10,
                        borderLeftColor: 'rgba(0,0,0,0)',
                        borderLeftWidth: 10,
                        borderTopColor: '#000',
                        borderTopWidth: 10,
                    }} />
                </View>
            </TouchableOpacity>
            <View style={{
                position: 'absolute',
                top: '100%',
                transform: [{
                    rotate: '135deg'
                }]
            }}>
            </View>
        </View>
    )
}

export default React.memo(ChartCol)

const styles = StyleSheet.create({})
