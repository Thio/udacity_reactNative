import React, { Component } from 'react'
import {Text, View} from 'react-native'

import PropTypes from 'prop-types'

export default class QuizView extends Component {
  render() {
    return (
      <View  styles={[styles]}>
        <Text>Quizview</Text>
      </View>
    )
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}
