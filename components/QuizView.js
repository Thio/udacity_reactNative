import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import {
  clearLocalNotification,
  setLocalNotification
} from "../util/notification";

class QuizView extends Component {
  state = {
    currentQuestionIndex: 0,
    correctAnswersCount: 0,
    showAnswer: 0
  };

  correctBtnPressed() {
    this.setState(state => {
      return {
        currentQuestionIndex: state["currentQuestionIndex"] + 1,
        correctAnswersCount: state["correctAnswersCount"] + 1,
        showAnswer: 0
      };
    });
  }

  inCorrectBtnPressed() {
    this.setState(state => {
      return {
        ...state,
        currentQuestionIndex: state["currentQuestionIndex"] + 1,
        showAnswer: 0
      };
    });
  }

  restartQuiz() {
    this.setState({
      currentQuestionIndex: 0,
      correctAnswersCount: 0,
      showAnswer: 0
    });
  }

  toggleShowAnswer() {
    this.setState(state => {
      return {
        ...state,
        showAnswer: !state["showAnswer"]
      };
    });
  }

  clearAndSetNotification() {
    clearLocalNotification().then(setLocalNotification);
  }

  renderScoreBoard() {
    this.clearAndSetNotification();
    const { deck, goBack } = this.props;
    const { cards } = deck;
    const { correctAnswersCount } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Your Score</Text>
          <Text style={styles.score}>
            {correctAnswersCount / cards.length * 100}
            %
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonBlack]}
            onPress={() => goBack()}
          >
            <Text style={[styles.buttonText]}>Back to Deck</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonBlack]}
            onPress={() => this.restartQuiz()}
          >
            <Text style={[styles.buttonText]}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderNewQuestionStartQuizView() {
    const { deck, goBack } = this.props;
    const { cards } = deck;
    const { currentQuestionIndex, showAnswer } = this.state;
    const card = cards[currentQuestionIndex];
    return (
      <View style={styles.container}>
        <Text style={styles.paging}>
          {currentQuestionIndex + 1}/{cards.length}
        </Text>
        <View style={styles.question}>
          <Text style={styles.text}>{card.q}</Text>
          {showAnswer ? (
            <Text
              style={[styles.answerMargin, styles.text]}
              onPress={() => this.toggleShowAnswer()}
            >
              {card.a}
            </Text>
          ) : (
            <Text
              style={[styles.answerMargin, styles.text]}
              onPress={() => this.toggleShowAnswer()}
            >
              click to see the answer
            </Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonGreen]}
            onPress={() => this.correctBtnPressed()}
          >
            <Text style={[styles.buttonText]}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonRed]}
            onPress={() => this.inCorrectBtnPressed()}
          >
            <Text style={[styles.buttonText]}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { deck, goBack } = this.props;
    const { currentQuestionIndex, correctAnswersCount } = this.state;
    const { cards } = deck;

    if (currentQuestionIndex > 0 && currentQuestionIndex === cards.length) {
      return this.renderScoreBoard();
    }

    return this.renderNewQuestionStartQuizView();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  scoreContainer: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center"
  },
  scoreText: {
    fontSize: 24,
    color: "black"
  },
  score: {
    fontSize: 24,
    color: "green"
  },
  question: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  paging: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  buttonContainer: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "stretch"
  },
  button: {
    padding: 10,
    height: 50,
    margin: 10,
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 30,
    borderWidth: 1,
    borderColor: "black"
  },
  buttonGreen: {
    backgroundColor: "green"
  },
  buttonRed: {
    backgroundColor: "red"
  },
  buttonBlack: {
    backgroundColor: "black"
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    textAlign: "center"
  },
  text: {
    fontSize: 22,
    color: "black"
  },
  answerMargin: {
    marginTop: 25
  }
});

function mapStateToProps(state, { navigation }) {
  const { title } = navigation.state.params;
  return {
    deck:
      state.decks.find(item => {
        return item.deckName === title;
      }) || {}
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack()
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizView);
