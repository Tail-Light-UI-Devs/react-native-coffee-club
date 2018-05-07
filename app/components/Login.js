import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, ActivityIndicator, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
// Components 
import ErrorMessage from '../components/ErrorMessage';
import Logo from '../components/Logo';
// Assets
import colors from '../assets/colors';
import layout from '../assets/layout';

firebase.initializeApp({
    apiKey: "AIzaSyBKIyV80MI2lVlxtGST_u_ATiKarrhmEro",
    authDomain: "coffee-club-app-authentication.firebaseapp.com",
    databaseURL: "https://coffee-club-app-authentication.firebaseio.com",
    storageBucket: "coffee-club-app-authentication.appspot.com"
});

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false,
            message: ''
        };
        console.log(AsyncStorage);
    }

    onLoginPress(){
        this.setState({error: '', loading: true});
        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( () => {
                console.log('Success');
                this.setState({error: '', loading: false, message: 'Welcome to the Coffee App'});
                this.setUserToken();
                Actions.homeView();

            })
            .catch( (e) => {
                console.log(e);
                this.setState({error: e, loading: false, message: 'You, Shall, Not, PASS!!!!'});
            });
    }

    onCreateUserPress(){
        this.setState({error: '', loading: true});
        const { email, password } = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( () => {
                this.setState({error: '', loading: false, message: 'Welcome to the Coffee App'});
                this.setUserToken();
                Actions.homeView();
            })
            .catch( (e) => {
                console.log(typeof e);
                console.log(e);
                this.setState({error: e, loading: false, message: 'You, Shall, Not, PASS!!!!'});
            });
    }

    async setUserToken(){
        try {
            await AsyncStorage.setItem('@MySuperStore:key', 'logged in');
        } catch (error) {
            console.log('Error persisting user token');
        }
    }

    renderLoaderButtonText(){
        if(this.state.loading){
            return(
            <ActivityIndicator
                color={colors.white}></ActivityIndicator>
            );
        } else {
            return(
                <Text
                    style={styleSheet.buttonText}>
                    Log In
                </Text>
            );
        }
    }

    generateErrorMessage(){
        if(this.state.message) {
            if (this.state.message.length > 0) {
                return (
                    <ErrorMessage>
                        {this.state.message}
                    </ErrorMessage>
                );
            } else {
                return '';
            }
        }
    }

    render() {
        return(
            <View
                style={styleSheet.loginView}>
                <TextInput
                    placeholder="Username"
                    style={styleSheet.login}
                    value={this.state.email}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={(userNameText) => this.setState({email: userNameText})}
                />
                <TextInput
                    placeholder="********"
                    style={styleSheet.login}
                    value={this.state.password}
                    autoCapitalize="none"
                    keyboardType="default"
                    secureTextEntry={true}
                    onChangeText={(userNamePassword) => this.setState({password: userNamePassword})}
                />
                <TouchableHighlight
                    onPress={() => { this.onLoginPress() }}>
                    <View
                        style={styleSheet.button}>
                        {this.renderLoaderButtonText()}
                    </View>
                </TouchableHighlight>
                <Button
                    title="Create new user"
                    color={colors.primary}
                    onPress={() => { this.onCreateUserPress() }}/>
                <View>
                    {this.generateErrorMessage()}
                </View>
                <Logo />
            </View>
        )
    }
}

const styleSheet = StyleSheet.create({
    loginView: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    login: {
        height: 50,
        width: 300,
        backgroundColor: colors.white,
        borderRadius: 3,
        marginBottom: layout.margin,
        padding: layout.padding
    },
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