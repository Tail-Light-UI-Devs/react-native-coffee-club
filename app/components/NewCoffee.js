import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, ActivityIndicator, AsyncStorage, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import routes from '../config/config';
//import { RNCamera, FaceDetector } from 'react-native-camera';
// Components 
import ErrorMessage from './ErrorMessage';
// Assets
import colors from '../assets/colors';
import layout from '../assets/layout';

export default class HomeView extends React.Component{
    state = {
        title: '',
        description: '',
        boughtLocation: '',
        flavor: '',
        rating: '',
        message: ''
    };

    constructor(props){
        super(props);
    }

    componentWillMount() {
        console.log(this.props);
    }

    async createCoffee(){
        return await fetch(`${routes.api}api/create-coffee`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body:         JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                boughtLocation: this.state.boughtLocation,
                flavor: this.state.flavor,
                rating: this.state.rating,
            })
        })
        .then((message) => {
            if(message) {
                console.log(message);
                if(message.status === 201) {
                    console.log(message);
                    this.setState({message: 'Coffee successfully created'});
                    setTimeout(() => {
                        Actions.homeView();
                    }, 1000);
                } else {
                    console.log(message);
                    const errorMessage = JSON.parse(message._bodyText).message;
                    this.setState({message: errorMessage});
                }
            }
        })
        .catch((error) => {
            this.setState({ error: 'Unable to edit coffee. Try again soon.' });
            console.log(error);
        });
    }

    renderErrorMessage(){
        if(this.state.message) {
            if (this.state.message.length > 0) {
                return (
                    <ErrorMessage>
                        <Text>
                            {this.state.message}
                        </Text>
                    </ErrorMessage>)
            }
        }
    }

    render() {
        return(
            <View
                style={styleSheet.editCoffeeView}>
                <TextInput
                    placeholder="Name"
                    style={styleSheet.input}
                    value={this.state.title}
                    autoCapitalize="sentences"
                    minLength={3}
                    onChangeText={(updateText) => this.setState({title: updateText})}
                />
                <TextInput
                    placeholder="Description"
                    style={styleSheet.input}
                    value={this.state.description}
                    autoCapitalize="sentences"
                    minLength={3}
                    onChangeText={(updateText) => this.setState({description: updateText})}
                />
                <TextInput
                    placeholder="Bought where"
                    style={styleSheet.input}
                    value={this.state.boughtLocation}
                    autoCapitalize="sentences"
                    onChangeText={(updateText) => this.setState({boughtLocation: updateText})}
                />
                <TextInput
                    placeholder="Flavor"
                    style={styleSheet.input}
                    value={this.state.flavor}
                    autoCapitalize="sentences"
                    onChangeText={(updateText) => this.setState({flavor: updateText})}
                />
                <TextInput
                    placeholder="Rating (1-10)"
                    style={styleSheet.input}
                    value={this.state.rating}
                    autoCapitalize="sentences"
                    onChangeText={(updateText) => this.setState({rating: updateText})}
                />
                <TouchableHighlight
                    onPress={() => { this.createCoffee() }}>
                    <View
                        style={styleSheet.button}>
                        <Text>
                            Create Coffee
                        </Text>
                    </View>
                </TouchableHighlight>
                {this.renderErrorMessage()}
            </View>
        )
    }
}

const styleSheet = StyleSheet.create({
    editCoffeeView: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    input: {
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