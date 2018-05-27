import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";

import React from "react";
import DeckListView from "./components/DeckListView";
import DeckView from "./components/DeckView";
import QuizView from "./components/QuizView";
import NewDeck from "./components/NewDeck";
import NewQuestion from "./components/NewQuestion";
import {
  createTabNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import { setLocalNotification } from "./util/notification";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";

import { FontAwesome } from "@expo/vector-icons";
import { Constants } from "expo";

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = createTabNavigator(
  {
    DeckListView: {
      screen: DeckListView,
      navigationOptions: {
        tabBarLabel: "Deck view",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="inbox" size={30} color={tintColor} />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: "New Deck",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? "purple" : "white",
      inactiveTintColor: Platform.OS === "ios" ? "black" : "black",
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? "white" : "darkgrey",
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs
    },
    DeckView: {
      screen: DeckView
    },
    NewQuestion: {
      screen: NewQuestion
    },
    QuizView: {
      screen: QuizView
    }
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <UdaciStatusBar
            backgroundColor={"darkgrey"}
            barStyle="light-content"
          />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
