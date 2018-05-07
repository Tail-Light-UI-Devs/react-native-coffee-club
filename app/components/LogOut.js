import React from 'react';
import { Button, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class LogOutButton extends React.Component{
    constructor(props){
        super(props);
    }

    async onLogOutClicked(){
        console.log('Logging out of Coffee Club App');
        try {
            await AsyncStorage.setItem('@MySuperStore:key', '');
            Actions.login();
        } catch (error) {
            console.log('Error unsetting MySuperStore token.');
        }
    }

    render() {
        return(
            <Button
                title="Log Out"
                onPress={ ()=> this.onLogOutClicked()}>
            </Button>
        )
    }
}
