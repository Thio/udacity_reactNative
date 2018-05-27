import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { addQuestion } from "../actions";

class NewQuestion extends Component {
  state = {
    q: "",
    a: ""
  };

  submit = () => {
    const { q, a } = this.state;
    const { deck } = this.props;
    if (q && a) {
      this.props.addQuestion(deck.deckName, { q, a });
      this.props.goBack();
    }
  };

  reset = () => {
    this.setState({ q: "", a: "" });
  };

  render() {
    const { deck } = this.props;
    return (
      <View style={styles.container}>
        <View style={(flex = 2)}>
          <Text style={styles.title}>New question for deck:</Text>
          <Text style={styles.title}>{deck.deckName}</Text>
          <TextInput
            style={styles.input}
            editable={true}
            placeholder="Enter the question here"
            onChangeText={q => this.setState({ q })}
          />
          <TextInput
            style={styles.input}
            editable={true}
            multiline={true}
            placeholder="Enter the answer here"
            onChangeText={a => this.setState({ a })}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button]} onPress={this.submit}>
            <Text style={styles.buttonText}>add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    color: "black",
    fontSize: 24,
    textAlign: "center"
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    height: 50
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
    goBack: () => navigation.goBack(),
    addQuestion: (title, card) => dispatch(addQuestion(title, card))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
