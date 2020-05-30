import { Dimensions } from "react-native";
import database from '@react-native-firebase/database'
import { getStatusBarHeight } from 'react-native-status-bar-height';
export const db = database().ref()
export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height
export const STATUS_BAR_HEIGHT = getStatusBarHeight()