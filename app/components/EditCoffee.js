import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import routes from '../config/config';
// import { RNCamera, FaceDetector } from 'react-native-camera';
// Components
import StatusMessage from './StatusMessage';
// Assets
import colors from '../assets/colors';
import layout from '../assets/layout';

export default class HomeView extends React.Component {
  state = {
    error: '',
    loading: false,
    message: '',
    title: '',
    description: '',
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props);
    console.log(routes.api);
    this.setState({
      title: this.props.coffeeData.title,
      description: this.props.coffeeData.description,
      id: this.props.coffeeData._id,
    });
  }

  async updateCoffee() {
    console.log('Update coffee called');
    return await fetch(`${routes.api}api/edit-coffee?coffee=${this.state.id}&title=${
      this.state.title
    }&description=${this.state.description}`)
      .then((message) => {
        this.setState({ message: 'Coffee successfully updated' });
        setTimeout(() => {
          Actions.homeView();
        }, 2000);
      })
      .catch((error) => {
        this.setState({ error: 'Unable to edit coffee. Try again soon.' });
        console.log(error);
      });
  }

  showAlert() {
    Alert.alert(
      'Delete Coffee',
      'Are you sure you want to delete this coffee?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.deleteCoffee() },
      ],
      { cancelable: false },
    );
  }

  async deleteCoffee() {
    console.log('Delete coffee called');
    return await fetch(
      `${routes.api}api/delete-coffee?coffee=${this.state.id}`,
      { method: 'delete' },
    )
      .then((message) => {
        this.setState({ message: 'Coffee successfully deleted' });
        setTimeout(() => {
          Actions.homeView();
        }, 2000);
      })
      .catch((error) => {
        this.setState({ error: 'Unable to delete coffee. Try again soon.' });
        console.log(error);
      });
  }

  renderErrorMessage() {
    if (this.state.message.length > 0) {
      return (
        <StatusMessage>
          <Text>{this.state.message}</Text>
        </StatusMessage>
      );
    }
  }

  render() {
    return (
      <View style={styleSheet.editCoffeeView}>
        <Text>Edit Coffee - {this.state.title}</Text>
        <TextInput
          placeholder={this.state.title}
          style={styleSheet.login}
          value={this.state.title}
          autoCapitalize="sentences"
          onChangeText={userNameText => this.setState({ title: userNameText })}
        />
        <TextInput
          placeholder={this.state.description}
          style={styleSheet.login}
          value={this.state.description}
          autoCapitalize="sentences"
          onChangeText={userNameText =>
            this.setState({ description: userNameText })
          }
        />
        <TouchableHighlight
          onPress={() => {
            this.updateCoffee();
          }}
        >
          <View style={styleSheet.button}>
            <Text>Update Coffee</Text>
          </View>
        </TouchableHighlight>
        <Button
          title="Delete Coffee"
          color={colors.primary}
          onPress={() => {
            this.showAlert();
          }}
        />
        {this.renderErrorMessage()}
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
  login: {
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
  buttonText: {
    color: colors.white,
  },
});
