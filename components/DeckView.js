import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { connect } from "react-redux";

class DeckView extends Component {
  render() {
    const { deck, navigateToNewQuestion, navigateToQuizView } = this.props;

    return (
      <View style={[styles.container]}>
        <View style={{ flex: 2 }}>
          <Text style={{ fontSize: 22, color: "black" }}>
            {deck.deckName} - {deck.cards.length}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => navigateToNewQuestion(deck.deckName)}
          >
            <Text style={styles.buttonText}>NewQuestion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              if (deck.cards.length > 0) navigateToQuizView(deck.deckName);
            }}
          >
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { title } = navigation.state.params;
  return {
    deck:
      state.decks.find(item => {
        return item.deckName === title;
      }) || {},
    decks: state.decks
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    navigateToNewQuestion: title =>
      navigation.navigate("NewQuestion", { title: title }),
    navigateToQuizView: title =>
      navigation.navigate("QuizView", { title: title })
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DeckView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "stretch"
  },
  button: {
    padding: 10,
    height: 50,
    margin: 20,
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black"
  },
  buttonText: {
    color: "black",
    fontSize: 22,
    textAlign: "center"
  }
});
