import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Assets
import colors from '../assets/colors';
import layout from '../assets/layout';

export default ({ status, children }) => (
  <View
    style={[
      styles.stats,
      {
        backgroundColor: status === 'success' ? colors.success : colors.error,
      },
    ]}
  >
    <Text>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  stats: {
    minHeight: 50,
    width: 300,
    borderRadius: 3,
    marginBottom: layout.margin,
    padding: layout.padding,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
