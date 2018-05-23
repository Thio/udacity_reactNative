import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import AddEntry from './components/AddEntry'
import DeckListView from './components/DeckListView'
import QuizView from './components/QuizView'
import {TabNavigator} from 'react-navigation'

import {FontAwesome} from '@expo/vector-icons'

function Home(){
  return (
    <View style={styles}>
      <Text>Home</Text>
    </View>
  )

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
}

const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: () => <FontAwesome name='home' size={3} color='white'/>
    }
  },
  NewQuiz: {
    screen: QuizView,
    navigationOptions: {
      tabBarIcon: () => <FontAwesome name='question' size={3} color='white'/>
    }
  },
  DeckListView: {
    screen: DeckListView,
    navigationOptions: {
      tabBarIcon: () => <FontAwesome name='cards' size={3} color='white'/>
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Tabs style={flex:1} />
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
