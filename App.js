import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
// Assets
import colors from './app/assets/colors';
import layout from './app/assets/layout';

// Components
import Router from './app/components/Router';
import Row from './app/components/Row';
import Login from './app/components/Login';
import Logo from './app/components/Logo';
import ErrorMessage from './app/components/ErrorMessage';
import Button from './app/components/Button';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      top: new Animated.Value(0),
      left: new Animated.Value(-20)
    }
  }

  componentWillMount(){
    console.log('Hello UI Coffee Club');
  }

  componentDidMount(){
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(
            this.state.left,
            {
                toValue: 0,
                duration: 1000
            }
        )]).start();

  }

  render() {
    return (
      <View style={styles.container}>
        <Router />
        {/*<Row>*/}
          {/*<Animated.View*/}
              {/*style={{...this.props.style, left: this.state.left}}>*/}
            {/*<Login></Login>*/}
          {/*</Animated.View>*/}
        {/*</Row>*/}
        {/*<Row>*/}
          {/*<Animated.View*/}
              {/*style={{...this.props.style, left: this.state.left}}>*/}
            {/*<Logo></Logo>*/}
          {/*</Animated.View>*/}
        {/*</Row>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tertiary
  }
});
