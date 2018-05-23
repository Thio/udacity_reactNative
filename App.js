import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import addEntry from './components/AddEntry'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AddEntry />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
