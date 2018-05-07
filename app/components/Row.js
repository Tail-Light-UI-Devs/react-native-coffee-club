import React from 'react';
import { StyleSheet, View } from 'react-native';
// Assets
import colors from '../assets/colors';
import layout from '../assets/layout';

export default class Login extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <View
                style={styleSheet.row}>
                {this.props.children}
            </View>
        )
    }
}

const styleSheet = StyleSheet.create({
    row: {
        marginBottom: 20
    }
});