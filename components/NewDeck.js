import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../actions";

class NewDeck extends Component {
  state = {
    title: ""
  };

  submit = () => {
    const { title } = this.state;
    if (title) {
      this.props.addDeck(title); //update Redux
      this.props.navigateToQuizView(title);
    }
  };

  reset = () => {
    this.setState({ title: "" });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={(flex = 2)}>
          <Text style={styles.title}>Create a new deck:</Text>
          <TextInput
            style={styles.deckTitle}
            editable={true}
            placeholder="Enter the deckname here"
            onChangeText={title => this.setState({ title })}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button]} onPress={this.submit}>
            <Text style={styles.buttonText}>Add deck</Text>
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
  deckTitle: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    height: 70
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

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    addDeck: title => dispatch(addDeck(title)),
    navigateToQuizView: title =>
      navigation.navigate("DeckView", { title: title })
  };
}
export default connect(null, mapDispatchToProps)(NewDeck);
