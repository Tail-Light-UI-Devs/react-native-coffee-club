import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, ActivityIndicator, AsyncStorage, FlatList, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
//import { RNCamera, FaceDetector } from 'react-native-camera';
// Components 
import LogOut from './LogOut';
// Assets
import colors from '../assets/colors';
import layout from '../assets/layout';

export default class HomeView extends React.Component{
    state = {
        email: '',
        password: '',
        error: '',
        loading: false,
        message: 'Not logged in yet.',
        coffees: []
    };

    constructor(props){
        super(props);
    }

    getAllCoffees(){
        return fetch('https://ui-coffee-club-api.herokuapp.com/api/get-coffees')
            .then((coffees) => coffees.json())
            .then((coffeesJson) => {
                this.setState({coffees: coffeesJson.coffees});
                console.log(this.state.coffees);
            })
            .catch((error) => {
                this.setState({ error: 'Unable to retrieve coffees. Try again soon.' });
                console.log(error);
            });
    };


    async componentWillMount(){
        this.getAllCoffees();
        try {
            const value = await AsyncStorage.getItem('@MySuperStore:key');
            if (value === null){
                Actions.login();
            }
        } catch (error) {
            console.log('Error retrieving value.');
        }
    }

    render() {
        return(
            <View
                style={styleSheet.homeView}>
                <LogOut />
                <ScrollView>
                    <FlatList
                        data={this.state.coffees}
                        keyExtractor={ (x, i) => i}
                        renderItem={({item}) =>
                            <View>
                                <Button
                                    onPress={() => { Actions.editView({coffeeData: item}) }}
                                    title={item.title}
                                    style={StyleSheet.editCoffeeButton} />
                            </View>
                        }
                    />
                    <TouchableHighlight
                        onPress={() => { Actions.newCoffeeView()}}>
                        <View
                            style={styleSheet.button}>
                            <Text>
                                Add a new coffee
                            </Text>
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        )
    }
}

const styleSheet = StyleSheet.create({
    homeView: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    button: {
        minHeight: 50,
        flex: 1,
        backgroundColor: colors.primary,
        borderRadius: 3,
        marginBottom: layout.margin,
        padding: layout.padding,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
});