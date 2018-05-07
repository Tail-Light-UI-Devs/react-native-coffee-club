import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
// Assets
import colors from '../assets/colors';
import layout from '../assets/layout';

export default class Button extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <View
                style={styleSheet.button}>
                <Text
                    style={styleSheet.buttonText}>
                    {this.props.children}
                </Text>
            </View>
        )
    }
}

const styleSheet = StyleSheet.create({
    button: {
        minHeight: 50,
        width: 300,
        backgroundColor: colors.primary,
        borderRadius: 3,
        marginBottom: layout.margin,
        padding: layout.padding,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: colors.white,
    }
});