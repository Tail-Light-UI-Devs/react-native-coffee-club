import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import routes from '../config/config';

// Components
import StatusMessage from './StatusMessage';
// Assets
import colors from '../assets/colors';
import layout from '../assets/layout';

export default class HomeView extends React.Component {
  state = {
    title: '',
    description: '',
    boughtLocation: '',
    flavor: '',
    rating: '',
    wasSuccessful: null,
    error: false,
    errorMessage: 'Unable to edit coffee. Try again soon.',
  };

  async createCoffee() {
    await fetch(`${routes.api}api/create-coffee`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        boughtLocation: this.state.boughtLocation,
        flavor: this.state.flavor,
        rating: this.state.rating,
      }),
    }).then((message) => {
      if (message) {
        if (message.status === 201) {
          this.setState(
            {
              wasSuccessful: true,
              error: false,
            },
            () => {
              setTimeout(() => {
                Actions.homeView();
              }, 2000);
            },
          );
        } else {
          this.setState({
            error: true,
            errorMessage: JSON.parse(message._bodyText).message,
            wasSuccessful: false,
          });
        }
      }
    });
  }

  render() {
    return (
      <View style={styleSheet.editCoffeeView}>
        <TextInput
          placeholder="Name"
          style={styleSheet.input}
          value={this.state.title}
          autoCapitalize="sentences"
          minLength={3}
          onChangeText={updateText => this.setState({ title: updateText })}
        />
        <TextInput
          placeholder="Description"
          style={styleSheet.input}
          value={this.state.description}
          autoCapitalize="sentences"
          minLength={3}
          onChangeText={updateText =>
            this.setState({ description: updateText })
          }
        />
        <TextInput
          placeholder="Bought where"
          style={styleSheet.input}
          value={this.state.boughtLocation}
          autoCapitalize="sentences"
          onChangeText={updateText =>
            this.setState({ boughtLocation: updateText })
          }
        />
        <TextInput
          placeholder="Flavor"
          style={styleSheet.input}
          value={this.state.flavor}
          autoCapitalize="sentences"
          onChangeText={updateText => this.setState({ flavor: updateText })}
        />
        <TextInput
          placeholder="Rating (1-10)"
          style={styleSheet.input}
          value={this.state.rating}
          autoCapitalize="sentences"
          onChangeText={updateText => this.setState({ rating: updateText })}
        />
        <TouchableOpacity
          onPress={() => {
            Actions.camera();
          }}
        >
          <View style={styleSheet.button}>
            <Text>Take Photo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.createCoffee();
          }}
        >
          <View style={styleSheet.button}>
            <Text>Create Coffee</Text>
          </View>
        </TouchableOpacity>
        {this.state.wasSuccessful &&
          !this.state.error && (
            <StatusMessage status="success">
              <Text>Coffee successfully created!</Text>
            </StatusMessage>
          )}
        {this.state.error &&
          !this.state.wasSuccessful && (
            <StatusMessage status="failure">
              <Text>{this.state.errorMessage}</Text>
            </StatusMessage>
          )}
      </View>
    );
  }
}

const styleSheet = StyleSheet.create({
  editCoffeeView: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: 300,
    backgroundColor: colors.white,
    borderRadius: 3,
    marginBottom: layout.margin,
    padding: layout.padding,
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
    alignItems: 'center',
  },
});
