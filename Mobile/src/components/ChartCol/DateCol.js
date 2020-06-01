import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'

const DateCol = ({ item }) => {
    const date = new Date(item.date)
    const _animationValue = React.useMemo(() => new Animated.Value(0), [])
    const _showDetail = () => {
        Animated.spring(_animationValue, {
            toValue: 1,
            useNativeDriver: false
        }).start()
    }
    const _hideDetail = () => {
        Animated.timing(_animationValue, {
            duration: 100,
            toValue: 0,
            useNativeDriver: false
        }).start()
    }
    return (
        <Animated.View style={{
            zIndex: _animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-1, 1]
            }),
            marginHorizontal: 5,
        }}>
            <TouchableOpacity
                onPressIn={_showDetail}
                onPressOut={_hideDetail}
                activeOpacity={1}
                style={styles.colWrapper}>
                <Animated.View style={{
                    position: 'absolute',
                    height: _animationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 30]
                    }),
                    width: _animationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 200]
                    }),
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 10,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#000',
                    top: 0,
                }}>
                    <Animated.View style={{
                        opacity: _animationValue,
                        position: 'absolute',
                        top: '100%',
                        left: _animationValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 95]
                        }),
                        borderRightColor: 'rgba(0,0,0,0)',
                        borderRightWidth: 10,
                        borderLeftColor: 'rgba(0,0,0,0)',
                        borderLeftWidth: 10,
                        borderTopColor: '#000',
                        borderTopWidth: 10,
                    }} />
                    <Animated.Text style={{
                        opacity: _animationValue,
                        width: '100%',
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>
                        {`0${date.getHours()}`.slice(-2)}:{`0${date.getMinutes()}`.slice(-2)}:{`0${date.getSeconds()}`.slice(-2)} {`0${date.getDay()}`.slice(-2)}/{`0${date.getMonth() + 1}`.slice(-2)}/{date.getFullYear()}
                    </Animated.Text>
                </Animated.View>
                <Text style={{
                    zIndex: -1,
                    width: '175%',
                    textAlign: 'center',
                    transform: [{
                        rotate: '-80deg'
                    }]
                }}>{`0${date.getHours()}`.slice(-2)}:{`0${date.getMinutes()}`.slice(-2)}:{`0${date.getSeconds()}`.slice(-2)}</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default React.memo(DateCol)

const styles = StyleSheet.create({
    colWrapper: {
        height: '100%',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',

    }
})
