/* The above class logs out the user from Firebase authentication and redirects them to the Login
screen in a React Native app. */
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";


export default class Logout extends Component {
  /**
   * This function signs out the user from Firebase authentication and redirects them to the Login
   * screen.
   */
  componentDidMount() {
    firebase.auth().signOut();
    this.props.navigation.replace("LoginScreen");
  }

  render() {
    return (
      /* This code is rendering a view with a text component that displays the word "Logout". The view
      has a style applied to it using the `styles.container` object defined in the
      `StyleSheet.create()` method. The style sets the flex property to 1, which means the view will
      take up all available space, and centers the content both horizontally and vertically using
      the `justifyContent` and `alignItems` properties. */
      <View style={styles.container}>
        <Text>Logout</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
