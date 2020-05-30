import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
const HeaderBg = (props) => {
    return (
        <View style={props.style}>
            <View style={{ backgroundColor: '#0099ff', height: 100 }} />
            <Svg
                width="100%"
                height={80}
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 1440 320`}>
                <Path fill="#0099ff" fill-opacity="1"
                    d="M0,320L48,304C96,288,192,256,288,240C384,224,480,224,576,197.3C672,171,768,117,864,122.7C960,128,1056,192,1152,186.7C1248,181,1344,107,1392,69.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
                </Path>
            </Svg>
        </View>
    )
}

export default HeaderBg

const styles = StyleSheet.create({})
