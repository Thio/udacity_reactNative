import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Navigator
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesome } from "@expo/vector-icons";

class DeckListView extends Component {

  render() {
    const { decks, navigateToQuizView } = this.props;
    return (
      <View styles={[styles.container]}>
        {this.props.decks ? (
          this.props.decks.map(deck => {
            return (
              <View
                key={deck.deckName}
                style={[styles.container, styles.row]}
                onPress={() => {}}
              >
                <Text style={styles.text} key={deck.deckName}>{deck.deckName}</Text>
                <Text style={styles.text} key={deck.cards}>{deck.cards.length}</Text>
                <FontAwesome
                  name="search"
                  size={30}
                  color={"darkgrey"}
                  onPress={() => navigateToQuizView(deck.deckName)}
                />
              </View>
            );
          })
        ) : (
          <View />
        )}
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  return {
    decks: state.decks,
    navigateToQuizView: title =>
      navigation.navigate("DeckView", { title: title })
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "space-around"
  },
  text: {
    fontSize: 22
  }
});

export default connect(mapStateToProps)(DeckListView);
