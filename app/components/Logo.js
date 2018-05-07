import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, TextInput } from 'react-native';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
// Assets
import colors from '../assets/colors';

export default class Logo extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return(
            <Svg
                height="200"
                width="200"

            >
                {/*<Path*/}
                    {/*d="M12,74.9v54.6c0,30,24.3,54.4,54.4,54.4s54.4-24.3,54.4-54.4l0.2-54.6c0,0,12.2,0.2,27.2,0.2*/}
                    {/*s27.2,12.2,27.2,27.2v53.9"*/}
                    {/*fill="none"*/}
                    {/*stroke={colors.primary}*/}
                    {/*strokeWidth="13"*/}
                {/*/>*/}
                {/*<Path*/}
                    {/*d="M46.6,15.5c6.5,6.4,10.5,15.3,10.5,25.1c0,9.9-4.1,18.8-10.6,25.2C40.3,72.2,36.5,81,36.5,90.6 c0,9.6,3.9,18.4,10.1,24.7"*/}
                    {/*fill="none"*/}
                    {/*stroke={colors.primary}*/}
                    {/*strokeWidth="13"*/}
                {/*/>*/}
                {/*<Path*/}
                    {/*d="M85.7,15.5c6.5,6.4,10.5,15.3,10.5,25.1c0,9.9-4.1,18.8-10.6,25.2C79.4,72.2,75.6,81,75.6,90.6 c0,9.6,3.9,18.4,10.1,24.7"*/}
                    {/*fill="none"*/}
                    {/*stroke={colors.primary}*/}
                    {/*strokeWidth="13"*/}
                {/*/>*/}
                {/*<Circle*/}
                    {/*cx="175.1"*/}
                    {/*cy="33.9"*/}
                    {/*r="13.6"*/}
                    {/*stroke={colors.primary}*/}
                    {/*strokeWidth="13"*/}
                    {/*fill="none"*/}
                {/*/>*/}
            </Svg>
        )
    }
}
