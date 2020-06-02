import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View, Animated, TextInputProps, StyleProp, ViewStyle } from 'react-native'
const Input = ({
    errorMsg,
    containerStyle,
    value,
    name,
    onChangeText,
    ...rest
}) => {
    const ref = useRef({ value: '', animated: false })
    const inputRef = useRef(null)
    const _labelAnimationValue = React.useMemo(() => new Animated.Value(0), [])
    useEffect(() => {
        ref.current.value = value
        if (value.length > 0 && !ref.current.animated) {
            ref.current.animated = true
            Animated.timing(_labelAnimationValue, {
                duration: 200,
                toValue: 1,
                useNativeDriver: false
            }).start(() => { })
        }
    }, [value])
    const _onFocusInput = () => {
        inputRef.current && inputRef.current.focus()
        if (ref.current.value.length === 0) {
            ref.current.animated = true
            Animated.timing(_labelAnimationValue, {
                duration: 200,
                toValue: 1,
                useNativeDriver: false
            }).start(() => { })
        }
    }
    const _onBlurInput = () => {
        if (ref.current.value.length === 0) {
            ref.current.animated = false
            Animated.timing(_labelAnimationValue, {
                duration: 200,
                toValue: 0,
                useNativeDriver: false
            }).start(() => { })
        }
    }
    return (
        <View style={[containerStyle, {
            height: 66
        }]}>
            <View style={styles.inputContainer}>
                <TextInput
                    {...rest}
                    value={value}
                    onFocus={_onFocusInput}
                    onBlur={_onBlurInput}
                    onChangeText={onChangeText}
                    ref={inputRef} style={styles.textInput} />
                <Animated.View
                    style={{
                        ...styles.label,
                        top: _labelAnimationValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['25%', '-50%']
                        }),
                        left: _labelAnimationValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [10, 0]
                        }),
                    }}>
                    <TouchableOpacity
                        onPress={_onFocusInput}
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                        }}
                        activeOpacity={1}>
                        <Animated.Text style={{

                            fontSize: _labelAnimationValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [16, 12]
                            }),
                            color: errorMsg ? 'red' : "#999"
                        }}>
                            {name}
                        </Animated.Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View >
    )
}

export default Input

const styles = StyleSheet.create({
    inputContainer: {
        borderRadius: 5,
        marginTop: 22,
        zIndex: 0,
        backgroundColor: "#fff",
        height: 44,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        position: 'absolute',
        justifyContent: 'center',
        width: '100%',
        height: '50%',
    },
    textInput: {
        paddingHorizontal: 10,
        fontSize: 16,
        height: '100%',
    }
})
