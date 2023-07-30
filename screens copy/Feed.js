/* The Feed class is a React component that displays a list of stories fetched from a Firebase database
and allows navigation to individual story pages. */
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import RecipeCard from "./RecipeCard";

import * as Font from "expo-font";
import { FlatList } from "react-native-gesture-handler";
import firebase from "firebase";

import * as SplashScreen from "expo-splash-screen";
import RecipeCard from "./RecipeCard";
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

/* `let stories = require("./temp_stories.json");` is importing a JSON file named "temp_stories.json"
and assigning its contents to the variable `stories`. The JSON file likely contains a list of
stories with their respective details such as title, author, and content. This is a temporary
solution for testing the app before connecting it to a Firebase database to fetch real stories. */
let stories = require("./temp_stories.json");

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      activateLightTheme: true,
      stories: [],
    };
  }

  /**
   * The function loads fonts asynchronously and fetches stories and user data.
   */
  componentDidMount() {
    this._loadFontsAsync();
    this.fetchStories();
    this.fetchUser();
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  /* The `fetchStories` function is responsible for fetching stories from the Firebase database. It uses
the `firebase.database().ref("/posts/")` method to reference the `/posts/` path in the database. */

  fetchStories = () => {
    firebase
      .database()
      .ref("/posts/")
      .on(
        "value",
        (snapshot) => {
          let stories = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              stories.push({
                key: key,
                value: snapshot.val()[key],
              });
            });
          }
          this.setState({ stories: stories });
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
  };

  /* The `fetchUser` function is fetching the current user's theme preference from the Firebase database.
It retrieves the `current_theme` value from the `/users/{userId}` path, where `{userId}` is the
unique identifier of the current user. */
  fetchUser = () => {
    let themeFromDB;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        themeFromDB = snapshot.val().current_theme;
        var themeValue = themeFromDb == "light" ? true : false;
        this.setState({ activateLightTheme: themeValue });
      });
  };

  /* The `renderItem` function is a callback function used by the `FlatList` component to render each
item in the list. It takes an object as a parameter, which contains the `item` property representing
the data for the current item being rendered. In this case, the `item` represents a story object. */
  renderItem = ({ item: recipe }) => {
    return <RecipeCard recipe={recipe} navigation={this.props.navigation} />;
  };

  /* The `keyExtractor` function is used in the `FlatList` component to extract a unique key for each
 item in the data array. In this case, it takes the `index` parameter and converts it to a string
 using the `toString()` method. This ensures that each item in the list has a unique key, which is
 required by React Native's `FlatList` component for efficient rendering and updating of the list
 items. */
  keyExtractor = (item, index) => index.toString();

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View
          style={ this.state.activateLightTheme ? styles.containerLight: styles.container }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.activateLightTheme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }
              >
                HealthyBites
              </Text>
            </View>
          </View>
          {!this.state.stories[0] ? (
            <View style={styles.noStories}>
              <Text
                style={
                  this.state.activateLightTheme
                    ? styles.noStoriesTextLight
                    : styles.noStoriesText
                }
              >
                No Recipes Available
              </Text>
            </View>
          ) : (
            <View style={styles.cardContainer}>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.stories}
                renderItem={this.renderItem}
              />
            </View>
          )}
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  cardContainer: {
    flex: 0.85,
  },
  noStories: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center",
  },
  noStoriesTextLight: {
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
  },
  noStoriesText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
  },
});
