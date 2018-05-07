import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
// Assets
import colors from '../assets/colors';
import layout from '../assets/layout';

export default class ErrorMessage extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <View
                style={styleSheet.errorMessage}>
                <Text>
                    {this.props.children}
                </Text>
            </View>
        )
    }
}

const styleSheet = StyleSheet.create({
    errorMessage: {
        minHeight: 50,
        width: 300,
        backgroundColor: colors.error,
        borderRadius: 3,
        marginBottom: layout.margin,
        padding: layout.padding,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});