import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, Permissions } from 'expo';
import colors from '../assets/colors';

export default class CameraView extends Component {
  state = {
    hasCameraPermission: null,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
        <Camera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.camera}
          type={Camera.Constants.Type.back}
        >
          <View style={styles.outerButton}>
            <TouchableOpacity style={styles.innerButton} />
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  outerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: colors.primary,
    borderRadius: 40,
  },
  innerButton: {
    width: 64,
    height: 64,
    backgroundColor: 'white',
    borderRadius: 32,
  },
});
